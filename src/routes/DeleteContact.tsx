import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";


export const action = async ({ params }: { params: any; }) => {
  
  await deleteContact(params.contactId);
  return redirect("/");
}


