import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { User } from '@/types';

const UserDetail = ({ selectedUser }: { selectedUser: User | null }) => {
	const [userImages, setUserImages] = useState<[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getImages = async () => {
		setIsLoading(true);
		setUserImages([]);
		const randomNumber = Math.floor(Math.random() * 50) + 1;
		const res = await fetch(
			`https://picsum.photos/v2/list?page=${randomNumber}&limit=9&client_id=dD9SfrMa2p1PLX6ojLJKfICDvrxctx-AKNUqBFQ03jQ`
		);
		const resJson = await res.json();
		setUserImages(resJson);
		setIsLoading(false);
	};
	useEffect(() => {
		getImages();
		const imageInterval = setInterval(() => {
			getImages();
		}, 10000);

		return () => {
			clearInterval(imageInterval);
		};
	}, [selectedUser]);

	function generateLongDescription(data: User | null) {
		if (data) {
			const { gender, name, location, email, dob, phone } = data;
			const { title, first, last } = name;
			const { street, city, state, country, postcode } = location;
			const age = dob.age;

			let description = `Meet ${title} ${first} ${last}, a ${age}-year-old ${gender} from ${street.number} ${street.name}, ${city}, ${state}, ${country}. `;

			description += `She can be reached at ${email}, or you can call her at ${phone}. `;
			description += `Born on ${dob.date}, ${title} ${last} enjoys the beauty of ${city} and its lovely surroundings. `;
			description += `With a postcode of ${postcode}, she's a proud resident of ${state}, ${country}.`;

			return description;
		} else {
			return 'No user present';
		}
	}
	if (!selectedUser) {
		return (
			<main className="h-screen w-full flex flex-row justify-center items-center text-[#435173]">
				Please select a user to view his/her details
			</main>
		);
	}
	return (
		<main className="py-16 px-48 text-center flex flex-col gap-6 h-max-screen overflow-scroll">
			<span className="text-[#435173] text-xl">
				{selectedUser?.name?.title +
					' ' +
					selectedUser?.name?.first +
					' ' +
					selectedUser?.name?.last}
			</span>
			<p className="text-[#727D96] text-sm">
				{generateLongDescription(selectedUser)}
			</p>
			{isLoading && (
				<div className="h-96 flex flex-row justify-center items-center  ">
					Loading...
				</div>
			)}
			{userImages?.length > 0 && !isLoading && (
				<div className="grid grid-cols-3 gap-6">
					{userImages.map((image: any, index: number) => {
						return (
							<div key={index} className="">
								<Image
									src={image.download_url}
									alt=""
									width={400}
									height={400}
									className="rounded-md"
									quality="10"
									priority={index < 4 ? true : false}
								/>
							</div>
						);
					})}
				</div>
			)}
		</main>
	);
};

export default UserDetail;
