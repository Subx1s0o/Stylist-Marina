"use client";

import { useEffect, useState } from "react";

import { Service, ServiceslistProps } from "@/types/services.interface";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { loadMoreServices } from "@/utils/loadMoreServices";
import { fetchServices } from "@/utils/services";

import ServiceCard from "./ServiceCard";

export default function ServicesList({
  services,
  locale,
  category,
  format,
}: ServiceslistProps) {
  const [currentServices, setCurrentServices] = useState<{
    data: Service[];
    totalPages: number;
  }>({
    data: services.data,
    totalPages: services.totalPages,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrentServices(services);
    setCurrentPage(1);
  }, [services]);

  const loadMore = async () => {
    if (loading || currentPage >= currentServices.totalPages) return;
    setLoading(true);
    try {
      const newPage = await loadMoreServices(
        currentPage,
        setCurrentServices,
        fetchServices,
        category.toLowerCase(),
        format,
      );
      setCurrentPage(newPage);
    } catch (error) {
      console.error("Failed to load more services:", error);
    } finally {
      setLoading(false);
    }
  };

  const observerRef = useInfiniteScroll({
    loadMore,
    currentPage,
    totalPages: currentServices.totalPages,
  });

  return (
    <div>
      <ul className="relative flex flex-col gap-7 ">
        {currentServices.data.map((service, number) => (
          <ServiceCard
            key={service._id}
            service={service}
            number={number}
            category={category}
            locale={locale}
          />
        ))}

        <li
          ref={observerRef}
          className="h-10 absolute bottom-0 w-full pointer-events-none"
        ></li>
      </ul>

      {loading && <div className="text-center py-4">Loading...</div>}
    </div>
  );
}
