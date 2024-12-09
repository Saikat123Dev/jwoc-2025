import { useForm } from "react-hook-form"
export default function RegistrationForm(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      function onSubmit(data){
        console.log("submiting the form",data);
      }
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
       <label>Name:</label>
       <input {...register("firstName", { required: true})}/>
      </div>
        </form>
      )
}