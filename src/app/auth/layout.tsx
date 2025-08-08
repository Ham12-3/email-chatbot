import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Bot, MessageCircle, Sparkles, Users, BarChart3, Zap } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();
  if (user) redirect("/");
  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
        <Image
          src="/logo.svg"
          alt="ChatBot Logo"
          sizes="100vw"
          style={{
            width: "20%",
            height: "auto",
          }}
          width={0}
          height={0}
          priority
        />
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full overflow-hidden relative bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex-col pt-16 pl-12 pr-8">
        {/* Floating background elements */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-40 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <h2 className="text-gray-800 text-4xl font-bold leading-tight mb-6">
            Hi, I&apos;m your AI powered<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              sales assistant
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg mb-12 leading-relaxed max-w-md">
            Our AI chatbots capture leads, answer questions, and boost conversions 24/7 — 
            something never done before.
          </p>

          {/* Feature grid with icons */}
          <div className="grid grid-cols-2 gap-6 max-w-lg">
            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">AI Assistant</h4>
                <p className="text-xs text-gray-600">Smart conversations</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Live Chat</h4>
                <p className="text-xs text-gray-600">Real-time support</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Lead Capture</h4>
                <p className="text-xs text-gray-600">Automated collection</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Analytics</h4>
                <p className="text-xs text-gray-600">Performance insights</p>
              </div>
            </div>
          </div>

          {/* Decorative chatbot illustration */}
          <div className="absolute bottom-8 right-12">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
