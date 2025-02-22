import Map from "./Map";

const ContactForm = ({ title, subjects, successMessage, address, lat, lng }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-amber-800 mb-6">{title}</h2>

      {/* Map Section */}
      <div className="mb-6">
        <Map lat={lat} lng={lng} address={address} />
        <p className="text-gray-700 mt-2 text-sm">{address}</p>
      </div>

      {/* Existing Contact Form Code */}
    </div>
  );
};

export default ContactForm