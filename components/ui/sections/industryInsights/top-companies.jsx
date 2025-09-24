import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../shared/shadcn/card";
const TopCompanies = ({ insights }) => {
  return (
    <Card className="col-span-6 md:col-span-12 sm:col-span-12">
      <CardHeader>
        <CardTitle className="text-lg sm:text-base">
          Top Paying Companies by Experience Level
        </CardTitle>
        <CardDescription className="text-sm sm:text-xs">
          Based on AI-analyzed salary insights for your selected industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insights.topCompanies?.map((company, idx) => (
            <div
              key={idx}
              className="p-4 border border-border rounded-xl shadow-sm bg-muted"
            >
              <h4 className="text-base font-semibold text-primary">
                {company.company}
              </h4>
              <p className="text-sm text-muted-foreground">
                {company.role} ({company.experienceLevel})
              </p>
              <p className="mt-1 text-sm">
                💰 ${company.salary.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCompanies;
