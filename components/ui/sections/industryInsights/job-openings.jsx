"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shared/shadcn/card";

const geoUrl =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const JobOpeningsMap = ({ jobOpenings }) => {
  const [geographies, setGeographies] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => {
        const withOpenings = data.features.map((feature) => {
          const countryJob = jobOpenings.find(
            (job) =>
              job.country.toLowerCase() ===
              feature.properties.name.toLowerCase(),
          );
          return {
            ...feature,
            properties: {
              ...feature.properties,
              openings: countryJob ? countryJob.openings : 0,
            },
          };
        });
        setGeographies(withOpenings);
      });
  }, [jobOpenings]);

  return (
    <Card className="col-span-6 md:col-span-12 sm:col-span-12">
      <CardHeader>
        <CardTitle className="text-lg sm:text-base">
          Job Openings by Country
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full h-[500px]">
            {/* ✅ Fixed label inside the card */}
            {hoveredCountry && (
              <div className="absolute top-2 left-2 p-2 bg-white rounded shadow z-10 text-sm">
                {hoveredCountry.name}: {hoveredCountry.openings} openings
              </div>
            )}

            {/* ✅ Floating tooltip that follows the mouse */}
            {tooltip && (
              <div
                className="absolute p-1 px-2 bg-white text-xs rounded shadow z-20 pointer-events-none"
                style={{
                  top: tooltip.y,
                  left: tooltip.x,
                }}
              >
                {tooltip.name}: {tooltip.openings} openings
              </div>
            )}

            <ComposableMap
              projectionConfig={{ scale: 160 }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Geographies
                geography={{
                  type: "FeatureCollection",
                  features: geographies,
                }}
              >
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const { name, openings = 0 } = geo.properties;

                    const fill =
                      hoveredCountry?.id === geo.id
                        ? "orange"
                        : openings
                          ? `rgba(255,0,0,${Math.min(openings / 20000, 0.9)})`
                          : "rgba(229,231,235,0.5)";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke="#111"
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                        onMouseEnter={(evt) => {
                          const { clientX, clientY } = evt;
                          setHoveredCountry({
                            id: geo.id,
                            name,
                            openings,
                          });
                          setTooltip({
                            name,
                            openings,
                            x: clientX + 10,
                            y: clientY + 10,
                          });
                        }}
                        onMouseMove={(evt) => {
                          const { clientX, clientY } = evt;
                          setTooltip((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  x: clientX + 10,
                                  y: clientY + 10,
                                }
                              : null,
                          );
                        }}
                        onMouseLeave={() => {
                          setHoveredCountry(null);
                          setTooltip(null);
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
          <div className="overflow-y-auto max-h-[500px] border rounded-lg p-2">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="text-left p-2">Country</th>
                  <th className="text-right p-2">Openings</th>
                </tr>
              </thead>
              <tbody>
                {geographies
                  .filter((g) => g.properties.openings > 0)
                  .sort((a, b) => b.properties.openings - a.properties.openings) // sort by openings
                  .map((geo) => (
                    <tr
                      key={geo.id}
                      className={`border-b hover:bg-gray-50 ${
                        hoveredCountry?.id === geo.id ? "bg-yellow-100" : ""
                      }`}
                    >
                      <td className="p-2">{geo.properties.name}</td>
                      <td className="p-2 text-right">
                        {geo.properties.openings}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobOpeningsMap;
