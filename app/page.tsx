"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Play } from "lucide-react";

interface Location {
	id: number; // Added id property
	title: string; // Added title property
	x: number; // This could represent longitude
	y: number; // This could represent latitude
	description: string;
}
// Simulating location data
const locations = [
	{
		id: 1,
		title: "Eiffel Tower",
		x: 30,
		y: 40,
		description: "Iconic iron tower in Paris",
	},
	{
		id: 2,
		title: "Statue of Liberty",
		x: 70,
		y: 60,
		description: "Famous statue in New York Harbor",
	},
	{
		id: 3,
		title: "Taj Mahal",
		x: 50,
		y: 80,
		description: "Beautiful mausoleum in Agra, India",
	},
];

export default function MapApp() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null
	);
	const [progress, setProgress] = useState(0);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Implement search functionality here
		console.log("Searching for:", searchTerm);
	};

	const handlePinClick = (location: Location) => {
		setSelectedLocation(location);
		setProgress(0);
	};

	const handlePlay = () => {
		// Simulate audio progress
		let currentProgress = 0;
		const interval = setInterval(() => {
			currentProgress += 1;
			setProgress(currentProgress);
			if (currentProgress >= 100) {
				clearInterval(interval);
			}
		}, 100);
	};

	const locations: Location[] = [
		{ id: 1, title: "Location 1", x: 10, y: 20, description: "Description 1" },
		{ id: 2, title: "Location 2", x: 30, y: 40, description: "Description 2" },
		// Add more locations as needed
	];

	return (
		<div className='h-screen flex flex-col'>
			<div className='p-4 bg-white shadow-md z-10'>
				<form
					onSubmit={handleSearch}
					className='flex items-center'
				>
					<Input
						type='text'
						placeholder='Search places...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='flex-grow'
					/>
					<Button
						type='submit'
						size='icon'
						className='ml-2'
					>
						<Search className='w-4 h-4' />
					</Button>
				</form>
			</div>
			<div className='flex-grow relative'>
				<div className='w-full h-full bg-red-500 relative'>
					{/* <img
						src='/images.png?height=1000&width=1000'
						alt='Map Placeholder'
						className='w-full h-full object-cover'
					/> */}
					{locations.map((location) => (
						<Button
							key={location.id}
							variant='outline'
							size='icon'
							className='absolute p-1 rounded-full'
							style={{
								left: `${location.x}%`,
								top: `${location.y}%`,
								transform: "translate(-50%, -50%)",
							}}
							onClick={() => handlePinClick(location)}
						>
							<MapPin className='w-4 h-4' />
						</Button>
					))}
				</div>
			</div>
			{selectedLocation && (
				<Card className='fixed bottom-4 left-4 right-4 z-[1000] max-w-md mx-auto'>
					<CardContent className='p-2 flex items-center'>
						<img
							src={`/images.png?height=60&width=60`}
							alt={selectedLocation.title}
							className='w-15 h-15 object-cover rounded-md mr-3'
						/>
						<div className='flex-grow mr-3'>
							<h3 className='font-semibold text-sm line-clamp-1'>
								{selectedLocation.title}
							</h3>
							<p className='text-xs text-muted-foreground line-clamp-1'>
								{selectedLocation.description}
							</p>
						</div>
						<Button
							size='icon'
							variant='ghost'
							onClick={handlePlay}
						>
							<Play className='w-6 h-6' />
						</Button>
					</CardContent>
					<div
						className='h-1 bg-primary transition-all duration-100 ease-in-out'
						style={{ width: `${progress}%` }}
					/>
				</Card>
			)}
		</div>
	);
}
