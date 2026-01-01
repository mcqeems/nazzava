'use client';
import { useState } from "react";
import {
  ChevronDown,
  Smartphone,
  Monitor,
  Play,
  Camera,
  MessageCircle,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GuidesData, type FeatureGuide } from "@/app/data/Guides";

const getIcon = (iconType: string) => {
  const iconClass = "w-6 h-6";
  switch (iconType) {
    case "zap":
      return <Zap className={iconClass} />;
    case "camera":
      return <Camera className={iconClass} />;
    case "play":
      return <Play className={iconClass} />;
    case "message":
      return <MessageCircle className={iconClass} />;
    default:
      return <Zap className={iconClass} />;
  }
};

const GuideCard = ({
  guide,
  isExpanded,
  onToggle,
}: {
  guide: FeatureGuide;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-primary transition-all duration-500 hover:shadow-xl">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary-light transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="text-primary">{getIcon(guide.iconType)}</div>
          <div className="text-left">
            <h3 className="lg:text-lg text-[16px] font-semibold text-foreground mb-1">
              {guide.title}
            </h3>
            <p className="lg:text-sm text-[12px] text-muted-text">
              {guide.description}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-text transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-4 border-t border-border">
          {guide.variations ? (
            <div className="space-y-6">
              {guide.variations.map((variation, idx) => (
                <div key={idx} className="mt-4">
                  <div className="flex items-center gap-2 mb-4 bg-primary-light px-4 py-2 rounded-lg">
                    {variation.platform === "Desktop" ? (
                      <Monitor className="w-5 h-5 text-primary" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-accent" />
                    )}
                    <h4 className="font-semibold text-foreground lg:text-[16px] text-[14px]">
                      Panduan {variation.platform}
                    </h4>
                  </div>
                  <div className="space-y-4 lg:ml-7 ml-4">
                    {variation.steps.map((step) => (
                      <div key={step.number} className="relative">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="lg:w-8 lg:h-8 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-semibold lg:text-sm text-[12px]">
                              {step.number}
                            </div>
                            {step.number < variation.steps.length && (
                              <div className="w-0.5 h-12 bg-border mt-2"></div>
                            )}
                          </div>
                          <div className="pb-4 flex-1">
                            <h5 className="font-semibold text-foreground lg:text-[15px] text-[13px]">
                              {step.title}
                            </h5>
                            <p className="text-muted-text lg:text-sm text-[12px] mt-1 text-justify">
                              {step.description}
                            </p>
                            {step.tips && (
                              <p className="lg:text-xs text-[11px] text-accent mt-2 flex items-start gap-2 bg-primary-light p-2 rounded-lg">
                                <span className="font-semibold mt-0.5">💡</span>
                                <span>{step.tips}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {guide.steps?.map((step) => (
                <div key={step.number} className="relative">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="lg:w-8 lg:h-8 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-semibold lg:text-sm text-[12px]">
                        {step.number}
                      </div>
                      {step.number < (guide.steps?.length || 0) && (
                        <div className="w-0.5 h-12 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <h5 className="font-semibold text-foreground lg:text-[15px] text-[13px]">
                        {step.title}
                      </h5>
                      <p className="text-muted-text lg:text-sm text-[12px] mt-1 text-justify">
                        {step.description}
                      </p>
                      {step.tips && (
                        <p className="lg:text-xs text-[11px] text-accent mt-2 flex items-start gap-2 bg-primary-light p-2 rounded-lg">
                          <span className="font-semibold mt-0.5">💡</span>
                          <span>{step.tips}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Informasi = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background font-poppins">
      <Navbar />

      <main className="flex-1 py-8 md:py-16 lg:pt-36 pt-28">
        <div className="max-w-7xl mx-auto lg:px-8 px-4">
          {/* Header */}
          <div
            className="text-center mb-12"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h1 className="lg:text-4xl text-3xl font-bold text-primary mb-4">
              Panduan Penggunaan Fitur
            </h1>
            <p className="text-muted-text lg:text-lg text-[14px] lg:px-0 px-2">
              Pelajari cara menggunakan semua fitur Nazzava dengan panduan
              interaktif langkah demi langkah
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-4" data-aos="fade-up" data-aos-duration="700">
            {GuidesData.map((guide, index) => (
              <div
                key={guide.id}
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay={index * 100}
              >
                <GuideCard
                  guide={guide}
                  isExpanded={expandedId === guide.id}
                  onToggle={() =>
                    setExpandedId(expandedId === guide.id ? null : guide.id)
                  }
                />
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div
            className="mt-16 bg-card rounded-2xl p-6 md:p-8 border-l-4 border-accent shadow-lg transition-all duration-500 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h2 className="lg:text-xl text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> Tips Umum
            </h2>
            <ul className="space-y-3 text-muted-text">
              <li className="flex gap-3 items-start">
                <span className="text-success font-bold text-lg mt-0.5">•</span>
                <span className="lg:text-[14px] text-[12px]">
                  Gunakan koneksi internet yang stabil untuk pengalaman terbaik
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-success font-bold text-lg mt-0.5">•</span>
                <span className="lg:text-[14px] text-[12px]">
                  Berikan izin akses kamera dan lokasi jika diminta untuk fitur
                  scan
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-success font-bold text-lg mt-0.5">•</span>
                <span className="lg:text-[14px] text-[12px]">
                  Setiap fitur dirancang untuk mobile dan desktop dengan
                  interface responsif
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-success font-bold text-lg mt-0.5">•</span>
                <span className="lg:text-[14px] text-[12px]">
                  Bagikan pencapaian dan pembelajaran Anda dengan teman untuk
                  menyebarkan kesadaran lingkungan
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Informasi;
