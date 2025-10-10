import { useNavigate } from "react-router-dom";
import { onSBPPaymentSubmit, SBPPaymentData, SBPPaymentForm as SBPPaymentFormConfig } from "./SBPPaymentFormConfig";
import { useAppDispatch } from "@/modules/OrderMenu";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { ControllerRenderProps } from "react-hook-form";

export const SBPPaymentForm = () => {
  const { control } = SBPPaymentFormConfig

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {data: user} = useGetUserQuery()

  return (
    <Form {...SBPPaymentFormConfig}>
      <form
        onSubmit={() => onSBPPaymentSubmit(dispatch, navigate, user?.id ?? "")}
        className="space-y-6"
      >
        <FormField
          control={control}
          name="phone"
          render={({ field }: { field: ControllerRenderProps<SBPPaymentData, "phone"> }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="телефон" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Оплатить
        </Button>
      </form>
    </Form>
  );
};