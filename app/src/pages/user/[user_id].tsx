import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { User } from '@/types';

const UserPage = ({ userList }: { userList: User[] }) => {
	const router = useRouter();
	const userId = router.query.user_id;

	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [userImages, setUserImages] = useState<[]>([]);

	const getUser = (id: string | string[] | undefined) => {
		if (id) {
			const user = userList?.find((user: User) => {
				return user.email === id;
			});
			if (user) {
				setCurrentUser(user);
			}
		}
	};

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

	const getImages = async () => {
		setUserImages([]);
		const randomNumber = Math.floor(Math.random() * 50) + 1;
		const res = await fetch(
			`https://picsum.photos/v2/list?page=${randomNumber}&limit=9&client_id=dD9SfrMa2p1PLX6ojLJKfICDvrxctx-AKNUqBFQ03jQ`
		);
		const resJson = await res.json();
		setUserImages(resJson);
	};
	useEffect(() => {
		getUser(userId);
		getImages();
	}, [userId]);

	useEffect(() => {
		const imageInterval = setInterval(() => {
			getImages();
		}, 10000);

		return () => {
			clearInterval(imageInterval);
		};
	}, [userId]);

	return (
		<main className="py-16 px-48 text-center flex flex-col gap-6 h-max-screen overflow-scroll">
			<span className="text-[#435173] text-xl">
				{currentUser?.name?.title +
					' ' +
					currentUser?.name?.first +
					' ' +
					currentUser?.name?.last}
			</span>
			<p className="text-[#727D96] text-sm">
				{generateLongDescription(currentUser)}
			</p>
			{userImages?.length && (
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

export default UserPage;
