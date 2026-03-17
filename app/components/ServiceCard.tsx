type Props = {
  title: string;
  description: string;
  price: number;
  icon: string;
};

export default function ServiceCard({ title, description, price, icon }: Props) {
  return (
    <div className="border p-4 rounded-xl shadow">
      <div className="text-2xl">{icon}</div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-500">{description}</p>
      <p className="font-semibold">€{price}</p>

      <button className="mt-3 bg-black text-white px-4 py-2 rounded">
        Book Now
      </button>
    </div>
  );
}