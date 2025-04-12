import { useParams, Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TicketPage = () => {
  const { id } = useParams<{ id: string }>();
  const paymentLink = `https://your-payment-link.com/pay?eventId=${id}`; // customize this

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Scan to Get Your Ticket</h1>
        <p className="mb-4 text-gray-600">Scan this QR code to proceed with payment for the event ticket.</p>

        <div className="inline-block bg-white p-6 rounded-xl shadow-lg">
          <QRCode value={paymentLink} size={256} />
        </div>

        <p className="mt-6 text-gray-700">
          Or click below to open the payment link directly:
        </p>
        <a 
          href={paymentLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block mt-2 bg-culture-600 hover:bg-culture-700 text-white px-6 py-3 rounded-md transition"
        >
          Pay Now
        </a>

        <div className="mt-10">
          <Link to="/events" className="text-culture-600 hover:text-culture-800">
            ← Back to Events
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicketPage;
