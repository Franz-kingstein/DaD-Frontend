import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#00FF7F', '#32CD32', '#228B22', '#006400', '#ADFF2F'];
const disasterTypes = ['cyclone', 'earthquake', 'flood', 'drought', 'forestfire'];
const regionMap = {
  'Andhra Pradesh': 'South', 'Tamil Nadu': 'South', 'Karnataka': 'South',
  'Uttar Pradesh': 'North', 'Delhi': 'North', 'Punjab': 'North',
  'Maharashtra': 'West', 'Gujarat': 'West',
  'Bihar': 'East', 'West Bengal': 'East', 'Odisha': 'East'
};

const DataViz = () => {
  const [fatalityTrends, setFatalityTrends] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [typeStats, setTypeStats] = useState([]);
  const [disasterFrequency, setDisasterFrequency] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(disasterTypes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = [];
        const typeAggregate = {};

        for (const type of disasterTypes) {
          const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/disasters`, {
            params: { type },
            timeout: 5000,
          });

          if (res.data && Array.isArray(res.data)) {
            const filtered = res.data.filter(e => {
              const year = parseInt(e.date?.split('-')?.[2]) || parseInt(e.date?.split('-')?.[0]);
              return year >= 2000 && year <= 2024;
            });

            const events = filtered.map(e => {
              const deaths = Number(e.deaths) || 0;
              const year = new Date(e.date).getFullYear();
              const location = e.location || 'Unknown';
              const disaster = { ...e, disasterType: type, year, deaths, location };
              typeAggregate[type] = (typeAggregate[type] || 0) + deaths;
              return disaster;
            });

            all.push(...events);
          }
        }

        processData(all);
        setTypeStats(Object.entries(typeAggregate).map(([type, deaths]) => ({ type, deaths })));
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const processData = (allData) => {
    const fatalityMap = {};
    const regionDisasterMap = {};
    const frequencyMap = {};

    allData.forEach(e => {
      const year = e.year;
      const type = e.disasterType;
      const region = regionMap[e.location] || 'Unknown';

      fatalityMap[year] = fatalityMap[year] || {};
      fatalityMap[year][type] = (fatalityMap[year][type] || 0) + e.deaths;

      regionDisasterMap[region] = regionDisasterMap[region] || { region };
      regionDisasterMap[region][type] = (regionDisasterMap[region][type] || 0) + 1;

      frequencyMap[year] = (frequencyMap[year] || 0) + 1;
    });

    const trends = [];
    for (let y = 2000; y <= 2024; y++) {
      const year = y.toString();
      const entry = { year };
      disasterTypes.forEach(type => {
        entry[type] = fatalityMap[y]?.[type] || 0;
      });
      trends.push(entry);
    }

    const frequencyTrends = Object.keys(frequencyMap).map(year => ({
      year,
      frequency: frequencyMap[year]
    }));

    setFatalityTrends(trends);
    setDisasterFrequency(frequencyTrends);
    setHeatmapData(Object.values(regionDisasterMap));
  };

  if (loading) return <div className="bg-black text-green-400 p-6 min-h-screen flex items-center justify-center text-2xl animate-pulse">Loading...</div>;
  if (error) return <div className="bg-black text-red-400 p-6 min-h-screen flex items-center justify-center flex-col">{error}</div>;

  const typeOptions = disasterTypes.map(type => ({ label: type, value: type }));

  return (
    <div className="bg-black text-green-400 p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center">📊 Disaster Visualizations (2000–2024)</h1>

      {/* Filter Dropdown */}
      <div className="max-w-xl mx-auto mb-10">
        <label className="block mb-2 text-green-300 font-semibold">Select Disaster Types:</label>
        <Select
          options={typeOptions}
          isMulti
          value={typeOptions.filter(opt => selectedTypes.includes(opt.value))}
          onChange={(selected) => setSelectedTypes(selected.map(s => s.value))}
          className="text-black"
        />
      </div>

      {/* Collage Format Layout */}
      <div className="grid gap-10 grid-cols-1 xl:grid-cols-2">
        {/* Line Chart - Yearly Death Trends by Type */}
        <div className="bg-[#111] p-4 rounded-lg border border-green-700">
          <h2 className="text-xl font-semibold mb-4 text-center">📈 Yearly Death Trends by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fatalityTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              {selectedTypes.map((type, index) => (
                <Line key={type} type="monotone" dataKey={type} stroke={COLORS[index % COLORS.length]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stacked Bar Chart */}
        <div className="bg-[#111] p-4 rounded-lg border border-green-700">
          <h2 className="text-xl font-semibold mb-4 text-center">🧱 Deaths per Year by Disaster Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fatalityTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              {selectedTypes.map((type, index) => (
                <Bar key={type} dataKey={type} stackId="a" fill={COLORS[index % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap */}
        <div className="col-span-1 xl:col-span-2 bg-[#111] p-4 rounded-lg border border-green-700">
          <h2 className="text-xl font-semibold mb-4 text-center">🔥 Disaster Type Frequency by Region</h2>
          <div className="overflow-auto">
            <table className="table-auto w-full text-center border border-green-700 text-white">
              <thead className="bg-green-800 text-black">
                <tr>
                  <th className="p-2">Region</th>
                  {disasterTypes.map((t) => (
                    <th key={t} className="p-2 capitalize">{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row, idx) => (
                  <tr key={idx} className="border-t border-green-600">
                    <td className="p-2 font-bold">{row.region}</td>
                    {disasterTypes.map((t) => (
                      <td key={t} className="p-2" style={{ backgroundColor: `rgba(0,255,127,${(row[t] || 0) / 10})` }}>{row[t] || 0}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pie Chart - Disaster Type Distribution */}
        <div className="bg-[#111] p-4 rounded-lg border border-green-700">
          <h2 className="text-xl font-semibold mb-4 text-center">🧩 Disaster Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeStats}
                dataKey="deaths"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {typeStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} deaths`, 'Total']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Disaster Frequency by Year */}
        <div className="bg-[#111] p-4 rounded-lg border border-green-700">
          <h2 className="text-xl font-semibold mb-4 text-center">📉 Disaster Frequency by Year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={disasterFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="frequency" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DataViz;
