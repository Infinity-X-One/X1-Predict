import MilestoneChart from '../components/MilestoneChart';

const testData = [
  { date: '2024-05-20', value: 320.2 },
  { date: '2024-05-21', value: 318.4 },
  { date: '2024-05-22', value: 314.9 },
  { date: '2024-05-23', value: 319.3 },
  { date: '2024-05-24', value: 325.1 },
];

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🚀 X1 Predict Prototype: Milestone Chart</h1>
      <MilestoneChart asset="TSLA" dataPoints={testData} />
    </div>
  );
}
