import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/dateFormat";

interface Blog {
  _id: number | string;
  bannerTitle: string;
  breadcrumbTitle: string;
  bannerImage: string;
  slug: string;
  bannerImagedetails: {
    alt: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
  date: string;
}

function LatestUpdates() {
  const [blogs, setBlogs] = useState<null | Blog[]>(null);
  const fetchHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/latest`
      );
      const blogs = await response.json();
      if (blogs.status === 200) {
        setBlogs(blogs.data);
      }
    } catch (error) {
      console.log("error in fetching blogs", error);
    }
  };
  useEffect(() => {
    fetchHandler();
  }, []);
  return blogs && Array.isArray(blogs) && blogs.length > 0 ? (
    <section className="latest-update">
      <div className="container">
        <div className="update-head d-flex justify-content-between align-items-center mb-2">
          <div className="left-side">
            <h2 className="com-title text-align-left">Latest Updates</h2>
          </div>
          <div className="right-side">
            <Link prefetch={false} href="/webblog" className="com-btn">
              View All
            </Link>
          </div>
        </div>
        <div className="row g-5 our-success-slider for-mobile mx-0">
          {blogs.map((blog, index: number) => (
            <div className="col-lg-4 col-md-6 ps-0" key={index}>
              <Blog blog={blog} key={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;
}
export default LatestUpdates;

const Blog = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="inner-card">
        <Image
          width={500}
          height={480}
          // alt={blog.bannerImagedetails.alt}
          alt="img"
          title={blog.bannerImagedetails.title}
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.bannerImage}`}
          className="w-100 h-100"
          priority={false}
        />

        <div className="inner-body">
          <span className="date">{formatDate(blog.date)}</span>
          <h3 className="innertext com-text">
            {blog.breadcrumbTitle} [...ReadMore]
          </h3>
        </div>
      </div>
    </Link>
  );
};
