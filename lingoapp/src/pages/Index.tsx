import { useEffect, useRef, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatInput } from "@/components/chat/ChatInput";
import { Languages, Sparkles, BookMarked, GraduationCap } from "lucide-react";
import logo from "../../logos/lingologo.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


import {
  sendMessageToServer,
  getConjugationChart,
  addWordToList,
} from "@/lib/api";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chart, setChart] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [isChartOpen, setIsChartOpen] = useState(false);


  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    const userId = Date.now().toString();
    const tempId = (Date.now() + 1).toString();

    // 1️⃣ Add user message + temp assistant bubble
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: text },
      { id: tempId, role: "assistant", content: "…" },
    ]);

    // 2️⃣ Fetch conjugation chart (parallel, non-blocking)
    getConjugationChart(text)
      .then((chartMd) => {
        setChart(chartMd?.trim() ? chartMd : "**No chart returned.**");
      })
      .catch(() => {
        setChart("**Error fetching chart.**");
      });

    try {
      // 3️⃣ Chat API
      const { reply, keywords } = await sendMessageToServer(text);

      // 4️⃣ Replace temp bubble with real reply
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId ? { ...m, content: reply } : m
        )
      );

      // 5️⃣ Store keywords
      setWords(keywords ?? []);

    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId
            ? { ...m, content: "⚠️ Error contacting server." }
            : m
        )
      );
    }
  };

const hasConjugation =
  chart &&
  chart.trim().length > 0 &&
  !chart.startsWith("**Error") &&
  !chart.startsWith("**No chart");


  const quickActions = [
    {
      icon: Languages,
      title: "Translate",
      description: "Translate text between languages",
      color: "bg-lingo-blue-light text-primary",
    },
    {
      icon: Sparkles,
      title: "Practice",
      description: "Practice with AI conversations",
      color: "bg-lingo-lime-light text-accent-foreground",
    },
    {
      icon: BookMarked,
      title: "Save Word",
      description: "Save words to your vocabulary",
      color: "bg-lingo-blue-light text-primary",
      onClick: async () => {
        if (words[0]) {
          await addWordToList(words[0]);
        }
      },
    },
    {
      icon: GraduationCap,
      title: "Quick Test",
      description: "Test your knowledge",
      color: "bg-lingo-lime-light text-accent-foreground",
    },
  ];

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 w-full">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center text-center max-w-2xl animate-fade-in">
            {/* Hero */}
            <div className="mb-6">
              <div className="flex justify-center mb-2">
                <img
                  src={logo}
                  alt="Lingo logo"
                  className="w-[28rem] max-h-48 object-contain"
                />
              </div>

              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                What would you like to learn today?
              </h1>
              <p className="text-lg text-muted-foreground">
                Translate, practice, and master new languages with AI-powered assistance
              </p>
            </div>
            

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg mb-6">
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  onClick={action.onClick}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-left group"
                >
                  <div
                    className={`p-2 rounded-lg ${action.color} transition-transform group-hover:scale-105`}
                  >
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
  <>
    {/* 🔹 Conjugation toggle button */}
    {hasConjugation && (
      <div className="w-full max-w-3xl flex justify-end mb-2">
        <button
          onClick={() => setIsChartOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                     text-sm border border-border bg-card
                     hover:bg-secondary transition"
        >
          <Languages className="w-4 h-4" />
          {isChartOpen ? "Hide conjugation" : "View conjugation"}
        </button>
      </div>
    )}

    {/* 🔹 Messages */}
    <div className="flex-1 w-full max-w-3xl overflow-y-auto py-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] px-4 py-3 rounded-2xl ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-secondary text-foreground rounded-bl-md"
            }`}
          >
            <div
              className="prose prose-sm max-w-none dark:prose-invert
                         prose-p:my-1
                         prose-table:my-2
                         prose-td:px-2 prose-td:py-1
                         prose-th:px-2 prose-th:py-1"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  </>
)}


        {isChartOpen && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/30 z-40"
      onClick={() => setIsChartOpen(false)}
    />

    {/* Side panel */}
    <div className="fixed inset-y-0 right-0 w-[560px] max-w-[90vw]
                bg-background border-l border-border shadow-xl
                z-50 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="font-semibold text-foreground">Conjugation</h2>
        <button
          onClick={() => setIsChartOpen(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="prose prose-sm max-w-none dark:prose-invert
                        prose-p:my-1
                        prose-table:my-2
                        prose-td:px-2 prose-td:py-1
                        prose-th:px-2 prose-th:py-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {chart}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  </>
)}

        {/* Input */}
        <div className="w-full pt-4">
          <ChatInput onSend={handleSend} />
          <p className="text-center text-xs text-muted-foreground mt-3">
            Lingo can help translate and teach you new languages
          </p>
        </div>
      </div>
    </MainLayout>

  );
};


export default Index;
