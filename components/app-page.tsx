"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Simulating CMS data
const places = [
	{
		id: 1,
		title: "Eiffel Tower",
		lat: 48.8584,
		lng: 2.2945,
		description: "Iconic iron tower in Paris",
		image: "/placeholder.svg?height=100&width=200",
	},
	{
		id: 2,
		title: "Statue of Liberty",
		lat: 40.6892,
		lng: -74.0445,
		description: "Famous statue in New York Harbor",
		image: "/placeholder.svg?height=100&width=200",
	},
	{
		id: 3,
		title: "Taj Mahal",
		lat: 27.1751,
		lng: 78.0421,
		description: "Beautiful mausoleum in Agra, India",
		image: "/placeholder.svg?height=100&width=200",
	},
];

const customIcon = new Icon({
	iconUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

export function Page() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredPlaces, setFilteredPlaces] = useState(places);

	const handleSearch = () => {
		const filtered = places.filter((place) =>
			place.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredPlaces(filtered);
	};

	return (
		<div className='h-screen flex flex-col'>
			<div className='p-4 bg-white shadow-md z-10'>
				<div className='flex gap-2'>
					<Input
						type='text'
						placeholder='Search places...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='flex-grow'
					/>
					<Button onClick={handleSearch}>
						<Search className='w-4 h-4 mr-2' />
						Search
					</Button>
				</div>
			</div>
			<MapContainer
				center={[20, 0]}
				zoom={3}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{filteredPlaces.map((place) => (
					<Marker
						key={place.id}
						position={[place.lat, place.lng]}
						icon={customIcon}
					>
						<Popup>
							<Card>
								<CardHeader>
									<CardTitle>{place.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<img
										src={place.image}
										alt={place.title}
										className='w-full h-auto mb-2'
									/>
									<p>{place.description}</p>
								</CardContent>
							</Card>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
