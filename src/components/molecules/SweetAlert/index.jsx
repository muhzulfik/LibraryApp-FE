import Swal from "sweetalert2";

export const showAlert = (title, text, icon, duration = 1000) => {
	return Swal.fire({
		title: title,
		text: text,
		icon: icon,
		showCancelButton: false,
		showConfirmButton: false,
		timer: duration, // Set the duration in milliseconds
	});
};
