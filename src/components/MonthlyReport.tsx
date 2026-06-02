import React, { useMemo, useRef, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyReport: React.FC = () => {
  const [show, setShow] = useState(false);
  const reportRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const open = () => setShow(true);
    window.addEventListener('open-report', open as EventListener);
    return () => window.removeEventListener('open-report', open as EventListener);
  }, []);

  // Sample analytics (could be replaced with real data from backend)
  const weeklyGrowth = useMemo(() => ({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    donations: [28, 34, 41, 50],
    recipes: [45, 52, 58, 66],
    users: [64, 78, 86, 94],
  }), []);

  const categories = useMemo(
    () => ({ labels: ['Vegetables', 'Grains', 'Dairy', 'Fruits'], amounts: [45, 33, 28, 22] }),
    []
  );

  const lineData = useMemo(() => ({
    labels: weeklyGrowth.labels,
    datasets: [
      {
        label: 'Donations',
        data: weeklyGrowth.donations,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.2)',
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: 'Recipes',
        data: weeklyGrowth.recipes,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.2)',
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: 'Users',
        data: weeklyGrowth.users,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  }), [weeklyGrowth]);

  const barData = useMemo(() => ({
    labels: categories.labels,
    datasets: [
      {
        label: 'Amount',
        data: categories.amounts,
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
    ],
  }), [categories]);

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#9ca3af' } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(148,163,184,0.2)' } },
      y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(148,163,184,0.2)' } },
    },
  } as const;

  const downloadPdf = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { backgroundColor: null, scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = 0;
    pdf.addImage(imgData, 'PNG', 0, y, imgWidth, imgHeight);
    while (imgHeight - (pageHeight - y) > 0) {
      y += pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -y, imgWidth, imgHeight);
    }

    pdf.save('rasoimate-monthly-report.pdf');
  };

  return (
    <section id="reports" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {show && (
          <div ref={reportRef} className="space-y-10">
            {/* Weekly Trend */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-heading">Weekly Growth Trend</h3>
              <Line data={lineData} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, legend: { position: 'bottom' } } }} />
            </div>

            {/* Categories Donated */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-heading">Food Categories Donated</h3>
              <Bar data={barData} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, legend: { display: false } } }} />
            </div>

            {/* Impact Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800/80 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-heading">Impact Summary</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li>✔️ You've helped <strong>350 families</strong> this month</li>
                <li>✔️ Prevented <strong>158kg of food waste</strong> from landfills</li>
                <li>✔️ Generated <strong>225 creative recipes</strong> from leftovers</li>
                <li>✔️ Your donations served <strong>920 meals</strong> to those in need</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={downloadPdf}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg"
              >
                <Download className="w-5 h-5" /> Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MonthlyReport;