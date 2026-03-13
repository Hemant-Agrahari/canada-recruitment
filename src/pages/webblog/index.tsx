import React, { useEffect, useState } from "react";
import meta from "../../meta/meta.json";
import Link from "next/link";
import { useRouter } from "next/router";
import CustomHead from "@/components/Head";
import Image from "next/image";
import Loading from "@/components/Loading";
import { formatDate } from "@/utils/dateFormat";

interface BlogI {
  slug: string;
  bannerTitle: string;
  breadcrumbTitle: string;
  bannerImage: string;
  bannerDesp: string;
  author: {
    bannerTitle: string;
  };
  bannerImagedetails: {
    alt: string;
    title: string;
  };
  views: number;
  date: string;
  categories?: string[] | string | null;
}

interface CategoryI {
  _id: string;
  title: string;
  slug: string;
}

const WebBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<null | BlogI[]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const router = useRouter();
  const { category: queryCategory } = router.query;

  useEffect(() => {
    if (queryCategory && typeof queryCategory === "string") {
      setSelectedCategory(queryCategory);
    }
  }, [queryCategory]);

  const fetchHandler = async (page: number, category: string) => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCategoriesBlog?categories=${category}&pageIndex=${page}&pageSize=10`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 200) {
        setBlogs(data.data);
        setTotalPages(data.pagination?.totalPages || 0);
      }
    } catch (error) {
      console.log("error in fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCategories?type=categories-management`
      );
      const data = await response.json();
      if (data.status === 200 && Array.isArray(data.data)) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log("error in fetching categories", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return !loading ? (
    <>
      <CustomHead {...meta["webblog"]} />
      <div className="inner-wrapper">
        <section className="breadcrumb p07">
          <div>
            <ul className="br-crumb">
              <li>
                <Link href="/">
                  <span>Home</span>
                </Link>
                <meta content="1" />
              </li>
            </ul>
            <span className="delimiter">›</span>
            <Link href="/webblog">
              <span>Webblog</span>
            </Link>
          </div>
        </section>
        {!loading && blogs && (
          <section className="content fancy-borders-disabled">
            <section className="main postlist blog-section single-all">
              <div className="row">
                <div className="col-md-12">
                  <h1>Latest News &amp; Blogs</h1>
                </div>
                <div className={categories.length > 0 ? "col-md-9" : "col-md-12"}>
                  <div className="row">
                    {Array.isArray(blogs) && blogs.length > 0 ? (
                      blogs.map((blog, index) => (
                        <div className={categories.length > 0 ? "col-md-6" : "col-md-4"} key={index}>
                          <Blog blog={blog} />
                        </div>
                      ))
                    ) : (
                      <div className="col-md-12">
                        <p className="no-data text-center">No blogs found for this category.</p>
                      </div>
                    )}
                  </div>
                  {blogs && blogs.length > 0 && (
                    <div className="col-12">
                      <nav className="project-nav blog-nav">
                        <span className="prev">
                          <Link
                            href="#"
                            className="page-numbers previous-page"
                            onClick={handlePrevPage}
                          // disabled={currentPage === 1}
                          >
                            Previous Posts
                          </Link>
                        </span>
                        <span className="next">
                          <Link
                            href="#"
                            className="page-numbers next-page"
                            onClick={handleNextPage}
                          // disabled={currentPage === totalPages}
                          >
                            Next Posts
                          </Link>
                        </span>
                      </nav>
                    </div>
                  )}
                </div>
                {categories.length > 0 && (
                  <div className="col-md-3">
                    <div className="categories">
                      <p className="cat-title">Categories</p>
                      {categories.length > 0 && (
                        <ul className="list_val">
                          {categories.length > 0 && categories.map((category) => (
                            <li className={`cat_list ${selectedCategory === category.slug ? "active" : ""}`} key={category._id}>
                              <Link href={`/webblog?category=${category.slug}`} onClick={(e) => {
                                e.preventDefault();
                                router.push({
                                  pathname: '/webblog',
                                  query: { category: category.slug }
                                }, undefined, { shallow: true });
                                setSelectedCategory(category.slug);
                                setCurrentPage(1);
                              }}>
                                {category.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </section>
        )}
      </div>
    </>
  ) : /* (
    <Loading />
  ); */ null
};

const Blog = ({ blog }: { blog: BlogI }) => {
  let categories: string[] = [];
  if (blog.categories) {
    if (typeof blog.categories === 'string') {
      try {
        categories = JSON.parse(blog.categories);
      } catch {
        categories = [blog.categories];
      }
    } else if (Array.isArray(blog.categories)) {
      categories = blog.categories;
    }
  }

  return (
    <article className="post-8656 post type-post status-publish format-standard has-post-thumbnail hentry category-hiring-tips category-recruitment-tips entry">
      <span className="post-title">
        <Link
          prefetch
          href={`/blog/${blog.slug}`}
          rel="bookmark"
          title={blog.bannerImagedetails.title}
        >
          {blog.bannerTitle}
        </Link>
      </span>
      <div className="tag-list">
        <p className="post-meta">
          <span className="spvc_area">
            <span className="spvc_icon"></span>
            <span className="spvc_views">{blog.views}</span>
          </span>
          <span>|</span>
          {formatDate(blog.date)}
          <span>|</span> {blog.author.bannerTitle}
          {categories && categories.length > 0 && (
            <>
              <span>|</span>
              <span className="categories">
                {categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href={`/category/${category}`}
                      rel="category tag"
                      className="text-capitalize"
                    >
                      {category}
                    </Link>
                    {index < categories.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </span>
            </>
          )}
          <span></span>
        </p>
      </div>
      <Link href={`/blog/${blog.slug}`} prefetch>
        <Image
          width="3000"
          height="1090"
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.bannerImage}`}
          title={blog.bannerImagedetails.title}
          alt={blog.bannerImagedetails.alt}
          className="attachment-medium size-medium wp-post-image"
          priority
          fetchPriority="high"
          decoding="async"
          sizes="(max-width: 34.9rem) calc(100vw - 2rem), (max-width: 53rem) calc(8 * (100vw / 12)), (min-width: 53rem) calc(6 * (100vw / 12)), 100vw"
        />
      </Link>
      <div className="blog-post-content">
        <p dangerouslySetInnerHTML={{ __html: blog.bannerDesp }} />
      </div>
      <p className="more more-icon">
        <Link href={`/blog/${blog.slug}`} prefetch>Read more</Link>
      </p>
    </article>
  );
};

export default WebBlog;
