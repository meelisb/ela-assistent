import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { SourcesSidebar } from "@/components/SourcesSidebar";
import { SYSTEM_PROMPT } from "@/systemPrompt";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

interface Message {
  role: "user" | "assistant";
  content: string;
}


const STARTER_QUESTIONS = [
  "Kuidas viidata APA stiilis?",
  "Mis on uurimisprobleem ja kuidas seda sõnastada?",
  "Mis vahe on kokkuvõttel ja järeldustel?",
  "Kuidas alustada teoreetilise ülevaate kirjutamist?",
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("anthropic-chat", {
        body: {
          messages: newMessages,
          systemPrompt: SYSTEM_PROMPT,
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
      };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Vabandust, tekkis viga. Palun proovi uuesti.",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleStarterClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <SourcesSidebar />
        <SidebarInset className="flex flex-col">
          {/* Header */}
          <header className="h-14 border-b flex items-center px-4 gap-3 bg-background">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ELA</span>
              </div>
              <span className="font-semibold text-foreground">Akadeemilise kirjutamise assistent</span>
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto">
                      <span className="text-primary-foreground font-bold text-xl">ELA</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">
                      Tere tulemast ELA akadeemilise kirjutamise assistenti!
                    </h1>
                    <p className="text-muted-foreground max-w-md">
                      Olen siin, et aidata sind akadeemilise kirjutamisega. Küsi minult ükskõik mida!
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                    {STARTER_QUESTIONS.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-3 px-4 text-left justify-start whitespace-normal"
                        onClick={() => handleStarterClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-w-3xl mx-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg px-4 py-3 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-chat-user text-chat-user-foreground"
                            : "bg-chat-assistant text-chat-assistant-foreground"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-chat-assistant text-chat-assistant-foreground rounded-lg px-4 py-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4 bg-background">
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Kirjuta oma küsimus siia..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
