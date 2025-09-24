// emails/ReportEmail.js
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
} from "@react-email/components";

export default function ReportEmail({ insights }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#fff", fontFamily: "Arial" }}>
        <Container style={{ padding: "20px" }}>
          <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
            Market Report Summary
          </Text>

          <Section>
            <Text>
              <strong>Market Outlook:</strong> {insights.marketOutlook}
            </Text>
            <Text>
              <strong>Growth Rate:</strong> {insights.growthRate}%
            </Text>
            <Text>
              <strong>Demand Level:</strong> {insights.demandLevel}
            </Text>
            <Text>
              <strong>Top Skills:</strong> {insights.topSkills.join(", ")}
            </Text>
          </Section>

          <Section>
            <Text
              style={{ fontSize: "18px", fontWeight: "bold", marginTop: 20 }}
            >
              Salary Ranges:
            </Text>
            {insights.salaryRanges.map((range, i) => (
              <Text key={i}>
                {range.role}: ${range.min} - ${range.max} (median: $
                {range.median})
              </Text>
            ))}
          </Section>

          <Section>
            <Text
              style={{ fontSize: "18px", fontWeight: "bold", marginTop: 20 }}
            >
              Key Trends:
            </Text>
            <ul>
              {insights.keyTrends.map((trend, i) => (
                <li key={i}>{trend}</li>
              ))}
            </ul>
          </Section>

          <Section>
            <Text
              style={{ fontSize: "18px", fontWeight: "bold", marginTop: 20 }}
            >
              Recommended Skills:
            </Text>
            <ul>
              {insights.recommendedSkills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </Section>

          <Text style={{ marginTop: 30 }}>
            Thanks,
            <br />
            BumbleBee Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
