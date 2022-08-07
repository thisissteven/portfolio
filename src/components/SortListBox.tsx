import React, { Fragment, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiSelector } from "react-icons/hi";
import { useTheme } from "next-themes";
import { TbSortAscendingLetters } from "react-icons/tb";
import { FaHeartbeat } from "react-icons/fa";

export default function SortListBox({
	selected,
	setSelected,
}: {
	selected: string;
	setSelected: React.Dispatch<SetStateAction<string>>;
}) {
	const { theme } = useTheme();

	return (
		<div className="max-w-[250px] min-w-[200px] self-end">
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<Listbox.Button
						className={`relative w-full cursor-default ${
							theme === "dark" ? "bg-[#2f2f2f]" : "bg-[#e2e2e2]"
						} py-2 pl-3 pr-10 text-left rounded-md shadow-md focus:outline-none sm:text-sm`}
					>
						<span className="flex items-center">
							{selected === "Sort by name" ? (
								<TbSortAscendingLetters className="mr-2 text-base" />
							) : (
								<FaHeartbeat className="mr-2 text-base" />
							)}
							<span className="font-semibold  text-base">{selected}</span>
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<HiSelector className="h-5 w-5 text-primary" aria-hidden="true" />
						</span>
					</Listbox.Button>
					<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Listbox.Options
							className={`rounded-md whitespace-nowrap absolute mt-2 max-h-60 w-full overflow-auto py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${
								theme === "dark" ? "bg-[#2f2f2f]" : "bg-[#e2e2e2]"
							}`}
						>
							{["Sort by name", "Sort by popularity"].map((option, optionIdx) => (
								<Listbox.Option
									key={optionIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-primary/10 " : "text-gray-900"}`
									}
									value={option}
								>
									{({ selected }) => (
										<>
											<span className={`block text-primary ${selected ? "font-semibold" : "font-normal"}`}>
												{option}
											</span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-bg">
													<HiCheck className="h-5 w-5 text-primary" aria-hidden="true" />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}
