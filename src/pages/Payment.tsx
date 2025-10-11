import { PaymentBlock } from "@/modules/PaymentBlock/PaymentBlock";
import {BreadCrumb} from "@/shared/ui/components/BreadCrumb";

const Payment = () => {
  return (
    <div>
      <BreadCrumb/>
      <PaymentBlock />
    </div>
  );
};

export default Payment;
