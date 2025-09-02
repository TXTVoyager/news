import Swal from "sweetalert2";
export function DeleteAlert() {
  return Swal.fire({
    title: "Are you sure?",
    text: "Do you won't delete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: " Delete ",
  });
}
