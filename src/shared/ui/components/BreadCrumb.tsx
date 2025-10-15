import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../kit/breadcrumb";

interface BreadCrumbItem {
  path: string;
  name: string;
}

// Конфигурация для автоматического определения названий
const BREADCRUMB_NAMES: Record<string, string> = {
  "/": "Главная",
  "/catalog": "Каталог",
  "/cart": "Корзина",
  "/liked": "Избранное",
  "/order": "Оформление заказа",
  "/payment": "Оплата",
  "/admin": "Админка",
};

export const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const breadcrumbs: BreadCrumbItem[] = [
    { path: "/", name: BREADCRUMB_NAMES["/"] || "Главная" },
  ];

  let accumulatedPath = "";
  pathnames.forEach((segment) => {
    accumulatedPath += `/${segment}`;

    const name =
      BREADCRUMB_NAMES[accumulatedPath] ||
      segment[0].toUpperCase() + segment.slice(1);

    breadcrumbs.push({
      path: accumulatedPath,
      name,
    });
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <BreadcrumbItem key={item.path}>
            <BreadcrumbLink asChild>
              <Link
                to={item.path}
                className={
                  index === breadcrumbs.length - 1
                    ? "text-foreground font-semibold"
                    : ""
                }
              >
                {item.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
