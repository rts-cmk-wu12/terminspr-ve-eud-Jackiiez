"use client"
import Link from 'next/link';

//kode brugt fra tidlere projekt
import React, { useState } from 'react';
import "./search.scss"

 
export default function Search() {
    const [id, setId] = useState('');
 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            window.location.href = `/aktiviteter/${id}`;
        }
    };
 
    return (
        <div className="city-input-section">
         <h2>Søg</h2>
                  
            <form onSubmit={handleSubmit}>
                  
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="e.g., 1,2,3,4,5..."
                    required
                />
              <Link href={`/aktiviteter/${id}`}>
                    <button type="button">Søg!</button>
                </Link>
            </form>
              <p>Oplysninger om søgning:</p>
                    <p>vi har flere Danse Programer på Landrup Dans og i som kunder skal bruge talet på Programmet</p>
                    <p>liste:</p>
                    <p>1 = Tango for begyndere...</p>
                    <p>2 = Junior Fitness Dance...</p>
                    <p>3 = Standard Dans..</p>
                    <p>4 = Poledance...</p>
                    <p>5 = Dans for seniore...</p>
        </div>
    );
}
 
