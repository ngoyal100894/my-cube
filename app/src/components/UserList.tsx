import React, { useEffect, useState } from 'react';
import { User } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
const UserList = ({
	page,
	setPage,
	loading,
	userList,
	selectedUser,
	setSelectedUser,
}: {
	page: number;
	setPage: any;
	loading: boolean;
	userList: User[];
	selectedUser: User | null;
	setSelectedUser: any;
}) => {
	// constants
	const router = useRouter();
	const userId = router.query.user_id;
	const pages = [1, 2, 3, 4, 5];

	function generateShortDescription(user: User) {
		const { name, gender, dob, location, email, phone } = user;
		const age = dob.age;
		const city = location.city;
		const country = location.country;

		let description = `Madame ${name.first} ${name.last} is a ${age}-year-old ${gender} from ${city}, ${country}. `;

		if (age) {
			description += `Born on ${dob.date}, she enjoys life to the fullest. `;
		}

		description += `You can contact her at ${email} or by phone at ${phone}.`;

		return description;
	}

	return (
		<main className="border-r-[1px] font-sans max-h-screen overflow-scroll">
			{loading ? (
				<div className="flex flex-row justify-center items-center h-screen w-full">
					{' '}
					Fetching Users...
				</div>
			) : (
				userList.map((user: User, index: number) => {
					return (
						<div
							className={`flex flex-col gap-4 p-6 border-b-[1px] hover:bg-[#D9E8FB] ${
								selectedUser?.email === user?.email
									? 'border-r-[3px] border-r-[#285FE7]'
									: ''
							}`}
							onClick={() => {
								setSelectedUser(user);
							}}
							key={index}
						>
							<div
								className={`text-[#435173] text-xl hover:underline ${
									selectedUser?.email === user?.email ? '!text-[#285FE7]' : ''
								}`}
							>
								{user.name.title + ' ' + user.name.first + ' ' + user.name.last}
							</div>
							<div className="text-sm text-[#727D96]">
								{generateShortDescription(user)}
							</div>
						</div>
					);
				})
			)}

			<div className="flex flex-row items-center gap-1 justify-center py-8">
				{pages.map((pageNumber: number, index: number) => {
					return (
						<div
							className={`${
								page === pageNumber
									? 'rounded-full  bg-black text-white'
									: 'hover:rounded-full  hover:bg-green-100 hover:cursor-pointer'
							}  h-9 w-9 flex justify-center items-center`}
							key={index}
							onClick={() => {
								setPage(pageNumber);
							}}
						>
							<span className={`font-bold`}>{pageNumber}</span>
						</div>
					);
				})}
			</div>
		</main>
	);
};

export default UserList;
