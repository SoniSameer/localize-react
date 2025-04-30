import React, { useState, useEffect } from 'react';
import LocalizedContentView from '../components/LocalizedContentView';
import { useView } from '../context/ViewContext';

const LocalizedContentPage = () => {
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const { viewMode, setViewMode } = useView();

  // Mock data for testing
  const mockContent = [
    {
      id: 'block1',
      content: '<p>Sehr geehrte Damen und Herren,</p>'
    },
    {
      id: 'block2',
      content: `<p>wir freuen uns, Ihnen Oxymat vorzustellen, das erste zugelassene
        Medikament zur Behandlung von Malaria, das zuverlässigen Schutz in
        Übereinstimmung mit den Empfehlungen der WHO. Oxymat basiert auf
        einem innovativen Wirkmechanismus, der den Lebenszyklus des
        Plasmodium-Parasiten gezielt unterbricht und eine schnelle Parasiten-
        Clearance ermöglicht. Klinische Studien zeigen eine Heilungsrate von 95
        % innerhalb von 7 Tagen, mit ausreichenden Wirkspiegeln (> 0,5 μg/ml)
        bei allen Probanden bereits nach 48 Stunden.</p>`
    },
    {
      id: 'block3',
      content: `<div class="bg-[#1a237e] text-white p-4 rounded">
        <p>Dieses Medikament ist als<br/>
        Erstlinientherapie gemäß<br/>
        internationalen Richtlinien<br/>
        positioniert und bietet flexible<br/>
        Dosierungsoptionen,<br/>
        einschließlich eines<br/>
        Schnellschemas (3 Tage, einmal<br/>
        täglich) sowie alternativer<br/>
        Schemata wie verkürzte oder<br/>
        verlängerte Regimes für<br/>
        immunkompetente Personen.</p>
        </div>`
    }
  ];

  const handleBlockClick = (blockId) => {
    setSelectedBlockId(blockId);
    // Only set comparison mode if not in advanced mode
    if (viewMode !== 'advanced') {
      setViewMode('comparison');
    }
  };

  // Reset view mode when component unmounts
  useEffect(() => {
    return () => setViewMode('default');
  }, [setViewMode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <LocalizedContentView
        content={mockContent}
        language="German"
        onBlockClick={handleBlockClick}
        selectedBlockId={selectedBlockId}
      />
    </div>
  );
};

export default LocalizedContentPage; 