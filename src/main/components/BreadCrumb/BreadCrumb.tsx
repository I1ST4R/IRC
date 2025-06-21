import { Link } from "react-router-dom";

interface PageLink {
  name: string;
  link: string;
}

interface BreadCrumbProps {
  pageLinks: PageLink[];
}

const BreadCrumb = ({ pageLinks }: BreadCrumbProps) => {
  return (
    <div className="breadcrumb">
      {pageLinks.map((item, index) => {
        return (
          <>
            {index > 0 && 
            <span className="breadcrumb__separator">/</span>
            } 
            {index === pageLinks.length - 1 && 
            <span className="breadcrumb__current">{item.name}</span>
            }
            {index < pageLinks.length - 1 && 
              <Link to={item.link} className="breadcrumb__link">
              {item.name}
              </Link>
            }
          </>
          
        );
      })}
    </div>
  );
};

export default BreadCrumb;
