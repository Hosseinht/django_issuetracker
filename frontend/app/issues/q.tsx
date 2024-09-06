// "use client";
//
// import { Box, Flex, Select, Text } from "@radix-ui/themes";
// import { Priority, Status } from "@/app/entities/Issue";
// import { useRouter, useSearchParams } from "next/navigation";
// import { FiFilter } from "react-icons/fi";
//
// const statuses: { label: string; value?: Status }[] = [
//   { label: "All" },
//   { label: "Open", value: "OPEN" },
//   { label: "In Progress", value: "IN_PROGRESS" },
//   { label: "Closed", value: "CLOSED" },
// ];
//
// const priorities: { label: string; value?: Priority }[] = [
//   { label: "All" },
//   { label: "Low", value: "LOW" },
//   { label: "Medium", value: "MEDIUM" },
//   { label: "High", value: "HIGH" },
// ];
//
// const IssueStatusFilter = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   console.log("searchParams", searchParams);
//   const handleChange = (type: "status" | "priority", value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (value === "All") {
//       params.delete(type);
//     } else {
//       params.set(type, value);
//     }
//
//     // Keep other parameters like ordering
//     if (searchParams.get("ordering")) {
//       params.set("ordering", searchParams.get("ordering")!);
//     }
//
//     const query = params.toString() ? `?${params.toString()}` : "";
//     router.push("/issues/" + query);
//   };
//
//   return (
//     <div>
//       <Select.Root
//         value={searchParams.get("status") || "Filter"}
//         onValueChange={(value) => handleChange("status", value)}
//       >
//         <Select.Trigger>
//           <Flex align="center">
//             <FiFilter className="mr-2" />
//
//             <span>Filter</span>
//           </Flex>
//         </Select.Trigger>
//         <Select.Content position="popper">
//           <Flex direction="row" gap="3" width="300px">
//             <Box width="100%">
//               <Text size="2" weight="bold">
//                 By status
//               </Text>
//               <hr className="h-px bg-bl-300 my-2" />
//               {statuses.map((status) => (
//                 <Select.Item key={status.value} value={status.value ?? "All"}>
//                   {status.label}
//                 </Select.Item>
//               ))}
//             </Box>
//
//             <Box width="100%">
//               <Text size="2" weight="bold">
//                 By priority
//               </Text>
//               <hr className="h-px bg-bl-300 my-2" />
//               <Select.Root
//                 value={searchParams.get("priority") || "Filter"}
//                 onValueChange={(value) => handleChange("priority", value)}
//               >
//                 {priorities.map((priority) => (
//                   <Select.Item
//                     key={priority.value}
//                     value={priority.value ?? "All"}
//                   >
//                     {priority.label}
//                   </Select.Item>
//                 ))}
//               </Select.Root>
//             </Box>
//           </Flex>
//         </Select.Content>
//       </Select.Root>
//     </div>
//   );
// };
// export default IssueStatusFilter;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";
//
// import { Box, Flex, Select, Text } from "@radix-ui/themes";
// import { Priority, Status } from "@/app/entities/Issue";
// import { useRouter, useSearchParams } from "next/navigation";
// import { FiFilter } from "react-icons/fi";
// import { useEffect } from "react";
//
// const statuses: { label: string; value?: Status }[] = [
//   { label: "All" },
//   { label: "Open", value: "OPEN" },
//   { label: "In Progress", value: "IN_PROGRESS" },
//   { label: "Closed", value: "CLOSED" },
// ];
//
// const priorities: { label: string; value?: Priority }[] = [
//   { label: "All" },
//   { label: "Low", value: "LOW" },
//   { label: "Medium", value: "MEDIUM" },
//   { label: "High", value: "HIGH" },
// ];
//
// const IssueStatusFilter = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   console.log("searchParams", searchParams);
//
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     console.log("useEffect param", params);
//     const query = params.toString() ? `?${params.toString()}` : "";
//     router.push("/issues/" + query);
//   }, [searchParams, router]);
//
//   const handleChange = (type: "status" | "priority", value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (value === "All") {
//       params.delete(type);
//     } else {
//       params.set(type, value);
//     }
//
//     Array.from(searchParams.keys()).forEach((key) => {
//       if (key !== type) {
//         params.set(key, searchParams.get(key)!);
//       }
//     });
//
//     const query = params.toString() ? `?${params.toString()}` : "";
//     router.push("/issues/" + query);
//   };
//
//   return (
//     <div>
//       <Select.Root
//         value={searchParams.get("status") || "Filter"}
//         onValueChange={(value) => handleChange("status", value)}
//       >
//         <Select.Trigger>
//           <Flex align="center">
//             <FiFilter className="mr-2" />
//
//             <span>Filter</span>
//           </Flex>
//         </Select.Trigger>
//         <Select.Content position="popper">
//           <Flex direction="row" gap="3" width="300px">
//             <Box width="100%">
//               <Text size="2" weight="bold">
//                 By status
//               </Text>
//               <hr className="h-px bg-bl-300 my-2" />
//               {statuses.map((status) => (
//                 <Select.Item key={status.value} value={status.value ?? "All"}>
//                   {status.label}
//                 </Select.Item>
//               ))}
//             </Box>
//
//             <Box width="100%">
//               <Text size="2" weight="bold">
//                 By priority
//               </Text>
//               <hr className="h-px bg-bl-300 my-2" />
//               <Select.Root
//                 value={searchParams.get("priority") || "Filter"}
//                 onValueChange={(value) => handleChange("priority", value)}
//               >
//                 {priorities.map((priority) => (
//                   <Select.Item
//                     key={priority.value}
//                     value={priority.value ?? "All"}
//                   >
//                     {priority.label}
//                   </Select.Item>
//                 ))}
//               </Select.Root>
//             </Box>
//           </Flex>
//         </Select.Content>
//       </Select.Root>
//     </div>
//   );
// };
// export default IssueStatusFilter;

// "use client";
//
// import { Box, Flex, Select, Text } from "@radix-ui/themes";
// import { Priority, Status } from "@/app/entities/Issue";
// import { useRouter, useSearchParams } from "next/navigation";
// import { FiFilter } from "react-icons/fi";
// import { useEffect, useState } from "react";
//
// const statuses: { label: string; value?: Status }[] = [
//   { label: "All" },
//   { label: "Open", value: "OPEN" },
//   { label: "In Progress", value: "IN_PROGRESS" },
//   { label: "Closed", value: "CLOSED" },
// ];
//
// const priorities: { label: string; value?: Priority }[] = [
//   { label: "All" },
//   { label: "Low", value: "LOW" },
//   { label: "Medium", value: "MEDIUM" },
//   { label: "High", value: "HIGH" },
// ];
//
// const IssueStatusFilter = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   console.log("searchParams", searchParams);
//   const [isOpen, setIsOpen] = useState(false);
//
//   // useEffect(() => {
//   //   const params = new URLSearchParams(searchParams.toString());
//   //   console.log("useEffect param", params);
//   //   const query = params.toString() ? `?${params.toString()}` : "";
//   //   router.push("/issues/" + query);
//   // }, [searchParams, router]);
//
//   const handleChange = (type: "status" | "priority", value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (value === "All") {
//       params.delete(type);
//     } else {
//       params.set(type, value);
//     }
//
//     Array.from(searchParams.keys()).forEach((key) => {
//       if (key !== type) {
//         params.set(key, searchParams.get(key)!);
//       }
//     });
//
//     const query = params.toString() ? `?${params.toString()}` : "";
//     router.push("/issues/" + query);
//   };
//
//   return (
//       <div className="relative">
//         <button
//             className="flex items-center px-4 py-2 bg-white rounded-md  border"
//             onClick={() => setIsOpen(!isOpen)}
//         >
//           <FiFilter className="mr-2" />
//           <span>Filter</span>
//         </button>
//         {isOpen && (
//             <div className="absolute mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex">
//               <div className="p-4">
//                 <Select.Root
//                     value={searchParams.get("status") || "Filter"}
//                     onValueChange={(value) => handleChange("status", value)}
//                 >
//                   <Select.Trigger className="w-full px-4 py-2 bg-white rounded-md hover:bg-gray-200">
//                     <Flex align="center">
//                       <span>Status</span>
//                     </Flex>
//                   </Select.Trigger>
//                   <Select.Content position="popper">
//                     <Box width="100%">
//                       <Text size="2" weight="bold">
//                         By status
//                       </Text>
//                       <hr className="h-px bg-gray-300 my-2" />
//                       {statuses.map((status) => (
//                           <Select.Item
//                               key={status.value}
//                               value={status.value ?? "All"}
//                           >
//                             {status.label}
//                           </Select.Item>
//                       ))}
//                     </Box>
//                   </Select.Content>
//                 </Select.Root>
//               </div>
//               <div className="p-4">
//                 <Select.Root
//                     value={searchParams.get("priority") || "Filter"}
//                     onValueChange={(value) => handleChange("priority", value)}
//                 >
//                   <Select.Trigger className="w-full px-4 py-2 bg-white rounded-md hover:bg-gray-200">
//                     <Flex align="center">
//                       <span>Priority</span>
//                     </Flex>
//                   </Select.Trigger>
//                   <Select.Content position="popper">
//                     <Box width="100%">
//                       <Text size="2" weight="bold">
//                         By priority
//                       </Text>
//                       <hr className="h-px bg-gray-300 my-2" />
//                       {priorities.map((priority) => (
//                           <Select.Item
//                               key={priority.value}
//                               value={priority.value ?? "All"}
//                           >
//                             {priority.label}
//                           </Select.Item>
//                       ))}
//                     </Box>
//                   </Select.Content>
//                 </Select.Root>
//               </div>
//             </div>
//         )}
//       </div>
//   );
// };
// export default IssueStatusFilter;
