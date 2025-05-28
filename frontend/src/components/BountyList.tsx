"use client";

import { Search, Filter, X, ChevronDown } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Modal } from "@/components/Modal";
import { ApplicationForm } from "@/components/ApplicationForm";
import Image from "next/image";
import { EthPrice } from "@/components/EthPrice";
import { ApplicationModal } from "@/components/ApplicationModal";

interface Bounty {
  id: string;
  title: string;
  organization: string;
  organizationLogo: string;
  timePosted: string;
  reward: {
    amount: string;
    token: string;
    usdValue?: string;
    icon: string;
  };
  skills?: string[];
  type?: "fixed" | "bidding";
}

const bounties: Bounty[] = [
  {
    id: "1",
    title: "Diseño y desarrollo de landing page para ETH Chile 2024",
    organization: "ChileDAO",
    organizationLogo: "/ethchilelogo.png",
    timePosted: "2 días atrás",
    reward: {
      amount: "0.5",
      token: "ETH",
      usdValue: "~$1,500",
      icon: "https://ext.same-assets.com/3604649370/839815190.png"
    },
    skills: ["Development", "Design", "Web3"]
  },
  // ... rest of the bounties array
];

const skillsList = [
  "Development", "Design", "Translation", "Writing", "Marketing",
  "Community", "Product", "Research", "Legal", "Operations",
  "Admin", "Data analytics"
];

const languages = ["Español", "English"];

export function BountyList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLogoAnimated(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredBounties = useMemo(() => {
    let filtered = bounties;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(bounty =>
        bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bounty.organization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(bounty =>
        bounty.skills && bounty.skills.some(skill => selectedSkills.includes(skill))
      );
    }

    return filtered;
  }, [searchQuery, selectedSkills]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleBountyClick = (bounty: Bounty) => {
    setSelectedBounty(bounty);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = async (data: { message: string; link: string }) => {
    // TODO: Integrate with backend
    console.log('Application submitted:', data);
    setShowApplicationModal(false);
  };

  return (
    <main className="min-h-screen bg-[var(--dework-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--dework-border)] bg-[var(--dework-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-[100] h-12 rounded-lg overflow-hidden flex-shrink-0">
                <a href="https://chiledao.xyz" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/chiledaodots.png"
                    alt="ChileDAO Logo"
                    width={64}
                    height={120}
                    className={`w-full h-full object-contain ${logoAnimated ? 'animate-logo-spin' : ''}`}
                  />
                </a>
              </div>
            </div>

            {/* Connect Button */}
            <div className="flex items-center space-x-4">
              <EthPrice />
              <button className="bg-[var(--dework-purple)] text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-[var(--dework-purple-light)] transition-colors">
                Connect
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Title Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Fuentes de trabajo</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 bg-[var(--dework-surface)] border border-[var(--dework-border)] text-[var(--dework-text)] px-4 py-2 rounded-lg hover:text-white transition-colors"
              aria-label="Toggle filters"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
          <p className="text-[var(--dework-text-muted)] text-base sm:text-lg">
            El futuro del trabajo es descentralizado. ¿Estás listo?
          </p>
        </div>
        {/* Main Layout: Filters + Bounties */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-[var(--dework-surface)] border border-[var(--dework-border)] rounded-xl p-6 space-y-6 relative">
              {/* Mobile close button */}
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden absolute top-4 right-4 text-[var(--dework-text-muted)] hover:text-white"
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-white font-semibold text-lg">Filters</h3>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--dework-text-muted)] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--dework-bg)] border border-[var(--dework-border)] rounded-lg py-2 pl-10 pr-4 text-[var(--dework-text)] placeholder-[var(--dework-text-muted)] focus:outline-none focus:border-[var(--dework-purple)] focus:ring-1 focus:ring-[var(--dework-purple)]"
                />
              </div>
              {/* Sorting */}
              <div>
                <label className="block text-[var(--dework-text)] font-medium mb-2 uppercase text-sm tracking-wide">
                  Ordenar
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-[var(--dework-bg)] border border-[var(--dework-border)] rounded-lg py-2 px-3 pr-8 text-[var(--dework-text)] focus:outline-none focus:border-[var(--dework-purple)] appearance-none"
                    aria-label="Sort bounties by"
                  >
                    <option value="newest">Fecha de creación (más reciente)</option>
                    <option value="oldest">Fecha de creación (más antigua)</option>
                    <option value="reward-high">Recompensa (mayor primero)</option>
                    <option value="reward-low">Recompensa (menor primero)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--dework-text-muted)] w-4 h-4 pointer-events-none" />
                </div>
              </div>
              {/* Skills */}
              <div>
                <label className="block text-[var(--dework-text)] font-medium mb-3 uppercase text-sm tracking-wide">
                  Habilidades
                </label>
                <p className="text-[var(--dework-text-muted)] text-sm mb-3">
                  Haz clic en las habilidades para filtrar tareas
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedSkills.includes(skill)
                          ? 'bg-orange-500 text-white'
                          : 'bg-[var(--dework-bg)] text-[var(--dework-text-muted)] hover:text-white border border-[var(--dework-border)]'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              {/* Languages */}
              <div>
                <label className="block text-[var(--dework-text)] font-medium mb-3 uppercase text-sm tracking-wide">
                  Idiomas
                </label>
                <div className="space-y-2">
                  {languages.map((language) => (
                    <label key={language} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(language)}
                        onChange={() => toggleLanguage(language)}
                        className="w-4 h-4 text-orange-500 bg-[var(--dework-bg)] border border-[var(--dework-border)] rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="text-[var(--dework-text)]">{language}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Bounties List */}
          <div className="flex-1">
            <div className="space-y-4">
              {filteredBounties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-xl text-white mb-2">No se encontraron bounties</h3>
                  <p className="text-[var(--dework-text-muted)]">
                    Intenta ajustar tu búsqueda o filtros
                  </p>
                </div>
              ) : (
                filteredBounties.map((bounty, index) => (
                  <div
                    key={bounty.id}
                    className="dao-card fade-in rounded-xl p-4 sm:p-6 cursor-pointer hover:shadow-lg hover:shadow-orange-500/20 transition-all border border-[var(--dework-border)] hover:border-orange-500"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleBountyClick(bounty)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Organization Logo */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--dework-surface)] overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={bounty.organizationLogo}
                            alt={bounty.organization}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Bounty Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                            {bounty.title}
                          </h3>
                          <p className="text-[var(--dework-text-muted)] text-sm mb-3">
                            {bounty.timePosted} por {bounty.organization}
                          </p>
                          {/* Skills */}
                          {bounty.skills && bounty.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {bounty.skills.slice(0, 3).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-1 bg-[var(--dework-bg)] text-[var(--dework-text-muted)] text-xs rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                              {bounty.skills.length > 3 && (
                                <span className="px-2 py-1 bg-[var(--dework-bg)] text-[var(--dework-text-muted)] text-xs rounded">
                                  +{bounty.skills.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Reward */}
                      <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                        <div className="flex items-center space-x-2 bg-[var(--dework-bg)] px-3 py-2 rounded-lg border border-[var(--dework-border)]">
                          <img src={bounty.reward.icon} alt={bounty.reward.token} className="w-4 h-4" />
                          <div className="text-right">
                            <div className="text-white text-sm font-medium">
                              {bounty.reward.amount} {bounty.reward.token}
                            </div>
                            {bounty.reward.usdValue && (
                              <div className="text-[var(--dework-text-muted)] text-xs">
                                {bounty.reward.usdValue}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplicationSubmit}
        bountyTitle={selectedBounty?.title}
        prerequisiteUrl={"https://app.defiverso.com/modulo-8-dormiu-acordou-coletou/"}
      />
    </main>
  );
}

// Add this at the bottom of the file
export default function BountyListWithStyle(props: any) {
  return <>
    <style jsx global>{`
      @keyframes logo-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-logo-spin {
        animation: logo-spin 1.2s cubic-bezier(0.4,0,0.2,1) 1;
      }
    `}</style>
    <BountyList {...props} />
  </>;
} 