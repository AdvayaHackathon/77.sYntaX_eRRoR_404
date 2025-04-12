import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button'; // update path if needed
import QRCode from 'react-qr-code';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleShowTicket = () => {
    // Ideally, you'd verify payment status here before redirecting
    navigate(`/event/${id}/ticket`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto text-center">
          <Link to={`/event/${id}`} className="inline-flex items-center mb-6 text-culture-600 hover:text-culture-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to event
          </Link>

          <h2 className="text-2xl font-bold mb-4">Scan to Pay</h2>
          <p className="mb-6 text-gray-600">Scan the QR code below to complete your payment.</p>

          <div className="bg-white p-6 rounded-lg shadow-md inline-block mb-6">
            <QRCode value={`upi://pay?pa=your@upiid&pn=CultureVoyager&am=499&cu=INR`} />
          </div>

          <Button onClick={handleShowTicket} className="bg-culture-600 hover:bg-culture-700 text-white px-6 py-3 rounded-md">
            Show Ticket
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
