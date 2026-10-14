import Link from "next/link";
import { Search, Bus, School, Truck, MapPin, Car } from "lucide-react";

const services = [
  {
    id: "nyumba-yangu",
    title: "Nyumba Yangu",
    subtitle: "Sco House Hunters",
    description:
      "Send us to your desired area and we will scout, photograph and list verified rental houses for you to browse from the comfort of your home.",
    icon: Search,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    href: "/house-hunters",
    cta: "Start Hunting",
    active: true,
  },
  {
    id: "school-transport",
    title: "Private School Transport",
    subtitle: "Sco School Runs",
    description:
      "Safe, reliable and professional private school transport for your children. Timely pick-ups and drop-offs, every day.",
    icon: Bus,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    href: "/school-transport",
    cta: "Find Transport",
    active: true,
  },
  {
    id: "schools-nearby",
    title: "Schools Nearby Hunter",
    subtitle: "Sco School Finder",
    description:
      "Moving to a new area? We scout and list schools near your new location — from nursery to secondary — so you can make the right choice.",
    icon: School,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    href: "/schools-nearby",
    cta: "Find Schools",
    active: true,
  },
  {
    id: "movers",
    title: "Movers Solutions",
    subtitle: "Sco Movers",
    description:
      "Planning a relocation? We connect you with trusted, professional movers to get your belongings to your new home safely and affordably.",
    icon: Truck,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    href: "/movers",
    cta: "Find Movers",
    active: true,
  },
  {
    id: "property-hunting",
    title: "Property Hunting",
    subtitle: "Sco Property — Cars & Land",
    description:
      "Looking for land or a vehicle? We scout listings across Kenya and present only the best options, so you don't have to leave your seat.",
    icon: Car,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    href: "/property",
    cta: "Browse Property",
    active: true,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Welcome to
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Sco-errands square
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for all your essential errands. We do the legwork so you can make the best choice — from finding the perfect home or school to seamless relocations and transport.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#services"
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Our Services
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Everything you need in one place. We do the legwork — you make the choice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-shadow ${
                    service.active ? "hover:shadow-md" : "opacity-75"
                  }`}
                >
                  {!service.active && (
                    <div className="bg-slate-100 text-slate-500 text-xs font-bold text-center py-1.5 tracking-widest uppercase">
                      Coming Soon
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-grow">
                    <div
                      className={`w-12 h-12 ${service.iconBg} rounded-lg flex items-center justify-center mb-5`}
                    >
                      <Icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-0.5">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-8">
                      {service.description}
                    </p>

                    {service.active ? (
                      <Link
                        href={service.href}
                        className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
                      >
                        {service.cta}
                      </Link>
                    ) : (
                      <div className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-slate-100 text-slate-400 text-sm font-semibold rounded-md cursor-not-allowed">
                        {service.cta}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About / Tagline Strip */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <MapPin className="w-10 h-10 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            We go where you need us.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Sco-errands square is built on a simple idea — you shouldn&apos;t
            have to exhaust yourself searching. Tell us what you need, tell us
            where, and we will be your eyes on the ground.
          </p>
        </div>
      </section>
    </div>
  );
}
