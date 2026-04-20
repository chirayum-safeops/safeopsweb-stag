import securityAssessmentImg from "@/assets/safeops-security-assessment.png";


const DashboardSlider = () => {
  return (
    <div className="space-y-6">
      {/* Image */}
      <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-card">
        <img
          src={securityAssessmentImg}
          alt="Security Assessment & Pentest Findings"
          className="w-full h-auto"
        />
      </div>

    </div>
  );
};

export default DashboardSlider;
