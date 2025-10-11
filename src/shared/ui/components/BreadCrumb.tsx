import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../kit/breadcrumb";

export const BreadCrumb = (config: Array<{ path: string; name: string }>) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {config.map((el) => {
          return (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={el.path}>{el.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
