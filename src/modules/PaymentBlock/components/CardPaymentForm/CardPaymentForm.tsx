import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { CardPaymentData, cardPaymentForm, onСardPaymentSubmit } from "./cardPaymentFormConfig";
import { useAppDispatch } from "@/modules/OrderMenu";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { ControllerRenderProps } from "react-hook-form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";

export const CardPaymentForm = () => {

  const { control } = cardPaymentForm

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {data: user} = useGetUserQuery()

  return (
    <Form {...cardPaymentForm}>
      <form
        onSubmit={() => onСardPaymentSubmit(dispatch, navigate, user?.id ?? "")}
        className="space-y-6"
      >
        <FormField
          control={control}
          name="number"
          render={({ field }: { field: ControllerRenderProps<CardPaymentData, "number"> }) => (
            <FormItem>
              <FormLabel>Номер карты</FormLabel>
              <FormControl>
                <Input placeholder="номер карты" {...field} />
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
