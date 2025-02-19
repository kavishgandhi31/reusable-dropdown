'use client'

import { useState } from "react";
import { DropdownComponent } from "./DropdownComponent";

export default function Home() {

  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { label: 'Option 1 is very very very very very long', value: '1' },
    { label: 'Option 2 is long', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ];

  return (
    <div className="flex flex-col row-start-2 items-center justify-center min-h-screen">        
        <DropdownComponent 
          label="Reusable Dropdown" 
          options={options} 
          isMultiSelect={true}
          selectedOptions={selectedOptions}
          onSelect={setSelectedOptions}
        />
    </div>
  );
}
