import { useState } from "react";

export default function DatePlayground() {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="mx-auto mt-10 max-w-md space-y-6 rounded bg-white p-6 shadow">
      <h2 className="text-center text-xl font-semibold">Date Playground</h2>
      {/* Single Date */}
      <div>
        <label className="mb-1 block text-gray-700">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        {console.log(selectedDate)}
        {selectedDate && (
          <p className="mt-1 text-sm text-gray-600">
            You picked: {selectedDate}
          </p>
        )}
        {selectedDate && (
          <p>
            {new Date(selectedDate) > new Date() ? "Future Date" : "Past Date"}
          </p>
        )}
      </div>
    </div>
  );
}
