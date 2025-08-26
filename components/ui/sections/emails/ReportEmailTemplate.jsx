const ReportEmailTemplate = ({ insights }) => {
  return (
    <div>
      <h2>Industry Report Summary</h2>
      <p><strong>Market Outlook:</strong> {insights.marketOutlook}</p>
      <p><strong>Growth Rate:</strong> {insights.growthRate}%</p>
      <p><strong>Demand Level:</strong> {insights.demandLevel}</p>
      <p><strong>Top Skills:</strong> {insights.topSkills.join(", ")}</p>
      <p><strong>Key Trends:</strong> {insights.keyTrends.join(", ")}</p>
      <p><em>See attachment for full details</em></p>
    </div>
  );
};

export default ReportEmailTemplate;
