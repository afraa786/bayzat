import {
  Activity,
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
  FileCheck2,
  MessageCircle,
  Users,
  WalletCards,
} from "lucide-react";

const ICONS_ROW1 = [Activity, CalendarDays, ChartNoAxesCombined, CircleDollarSign, FileCheck2, MessageCircle, Users];
const ICONS_ROW2 = [WalletCards, Users, FileCheck2, Activity, CircleDollarSign, CalendarDays, MessageCircle];

export default function LogoMarquee() {
  const renderRow = (icons, direction) => {
    const repeatedIcons = [...icons, ...icons, ...icons, ...icons];
    return (
      <div className={`integration-track integration-track-${direction}`}>
        {repeatedIcons.map((Icon, index) => (
          <div className="integration-icon" key={`${direction}-${index}`}>
            <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="marquee-section integration-section" aria-label="Compatible workplace tools">
      <div className="integration-grid" aria-hidden="true" />
      <div className="integration-marquee">
        <div className="integration-mask">
          {renderRow(ICONS_ROW1, "left")}
          {renderRow(ICONS_ROW2, "right")}
          <div className="integration-fade integration-fade-left" />
          <div className="integration-fade integration-fade-right" />
        </div>
      </div>
    </section>
  );
}
