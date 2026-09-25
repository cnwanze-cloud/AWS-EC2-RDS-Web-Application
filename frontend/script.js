// ======================================================
// CLOUDCARE PATIENT MANAGEMENT
// Frontend JavaScript
// ======================================================


// Store the patient records currently loaded from RDS
let patients = [];


// ======================================================
// DOM ELEMENTS
// ======================================================

const patientForm =
    document.getElementById("patientForm");

const patientsBody =
    document.getElementById("patientsBody");

const totalPatients =
    document.getElementById("totalPatients");

const searchInput =
    document.getElementById("searchInput");

const editModal =
    document.getElementById("editModal");

const editForm =
    document.getElementById("editForm");

const closeModal =
    document.getElementById("closeModal");

const cancelEdit =
    document.getElementById("cancelEdit");

const notification =
    document.getElementById("notification");

const notificationMessage =
    document.getElementById("notificationMessage");


// ======================================================
// LOAD PATIENTS
// ======================================================

async function loadPatients() {

    try {

        patientsBody.innerHTML = `
            <tr>
                <td colspan="8" class="loading">
                    Loading patient records...
                </td>
            </tr>
        `;


        const response =
            await fetch("api/get_patients.php");


        if (!response.ok) {

            throw new Error(
                "Unable to contact the server."
            );

        }


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                data.message ||
                "Unable to retrieve patients."
            );

        }


        patients = data.patients || [];


        renderPatients(patients);


        totalPatients.textContent =
            patients.length;


    } catch (error) {

        console.error(error);


        patientsBody.innerHTML = `
            <tr>
                <td colspan="8" class="loading">
                    Unable to load patient records.
                </td>
            </tr>
        `;


        showNotification(
            error.message,
            true
        );

    }

}


// ======================================================
// RENDER PATIENTS
// ======================================================

function renderPatients(data) {

    if (!data.length) {

        patientsBody.innerHTML = `
            <tr>
                <td colspan="8" class="loading">
                    No patient records found.
                </td>
            </tr>
        `;

        return;

    }


    patientsBody.innerHTML =
        data.map(patient => {

            return `

                <tr>

                    <td>
                        <strong>#${escapeHTML(patient.id)}</strong>
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(patient.full_name)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(patient.age)}
                    </td>

                    <td>
                        ${escapeHTML(patient.gender)}
                    </td>

                    <td>
                        ${escapeHTML(patient.phone || "-")}
                    </td>

                    <td>
                        ${escapeHTML(patient.diagnosis)}
                    </td>

                    <td>
                        ${formatDate(patient.created_at)}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="action-btn edit-btn"
                                onclick="openEditModal(${patient.id})"
                                title="Edit patient"
                            >
                                ✎
                            </button>

                            <button
                                class="action-btn delete-btn"
                                onclick="deletePatient(${patient.id})"
                                title="Delete patient"
                            >
                                ×
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }).join("");

}


// ======================================================
// ADD PATIENT
// ======================================================

patientForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const submitButton =
            patientForm.querySelector(
                'button[type="submit"]'
            );


        submitButton.disabled = true;

        submitButton.innerHTML =
            "Saving...";


        try {

            const formData =
                new FormData(patientForm);


            const response =
                await fetch(
                    "api/add_patient.php",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Unable to add patient."
                );

            }


            showNotification(
                "Patient added successfully."
            );


            patientForm.reset();


            await loadPatients();


            document
                .getElementById("records")
                .scrollIntoView({
                    behavior: "smooth"
                });


        } catch (error) {

            console.error(error);


            showNotification(
                error.message,
                true
            );

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                "<span>＋</span> Add Patient";

        }

    }
);


// ======================================================
// SEARCH
// ======================================================

searchInput.addEventListener(
    "input",
    function() {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!query) {

            renderPatients(patients);

            return;

        }


        const filtered =
            patients.filter(patient => {

                return (

                    String(patient.id)
                        .toLowerCase()
                        .includes(query)

                    ||

                    String(patient.full_name)
                        .toLowerCase()
                        .includes(query)

                    ||

                    String(patient.gender)
                        .toLowerCase()
                        .includes(query)

                    ||

                    String(patient.phone || "")
                        .toLowerCase()
                        .includes(query)

                    ||

                    String(patient.diagnosis)
                        .toLowerCase()
                        .includes(query)

                );

            });


        renderPatients(filtered);

    }
);


// ======================================================
// OPEN EDIT MODAL
// ======================================================

function openEditModal(id) {

    const patient =
        patients.find(
            item =>
                Number(item.id) === Number(id)
        );


    if (!patient) {

        showNotification(
            "Patient record not found.",
            true
        );

        return;

    }


    document.getElementById(
        "edit_id"
    ).value = patient.id;


    document.getElementById(
        "edit_full_name"
    ).value = patient.full_name;


    document.getElementById(
        "edit_age"
    ).value = patient.age;


    document.getElementById(
        "edit_gender"
    ).value = patient.gender;


    document.getElementById(
        "edit_phone"
    ).value = patient.phone || "";


    document.getElementById(
        "edit_diagnosis"
    ).value = patient.diagnosis;


    editModal.classList.add("show");

}


// ======================================================
// CLOSE EDIT MODAL
// ======================================================

function closeEditModal() {

    editModal.classList.remove("show");

}


closeModal.addEventListener(
    "click",
    closeEditModal
);


cancelEdit.addEventListener(
    "click",
    closeEditModal
);


// Close modal when clicking outside it

editModal.addEventListener(
    "click",
    function(event) {

        if (event.target === editModal) {

            closeEditModal();

        }

    }
);


// ======================================================
// UPDATE PATIENT
// ======================================================

editForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const formData =
            new FormData();


        formData.append(
            "id",
            document.getElementById("edit_id").value
        );


        formData.append(
            "full_name",
            document.getElementById("edit_full_name").value
        );


        formData.append(
            "age",
            document.getElementById("edit_age").value
        );


        formData.append(
            "gender",
            document.getElementById("edit_gender").value
        );


        formData.append(
            "phone",
            document.getElementById("edit_phone").value
        );


        formData.append(
            "diagnosis",
            document.getElementById("edit_diagnosis").value
        );


        try {

            const response =
                await fetch(
                    "api/update_patient.php",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Unable to update patient."
                );

            }


            showNotification(
                "Patient updated successfully."
            );


            closeEditModal();


            await loadPatients();


        } catch (error) {

            console.error(error);


            showNotification(
                error.message,
                true
            );

        }

    }
);


// ======================================================
// DELETE PATIENT
// ======================================================

async function deletePatient(id) {

    const patient =
        patients.find(
            item =>
                Number(item.id) === Number(id)
        );


    if (!patient) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${patient.full_name}?`
        );


    if (!confirmed) {

        return;

    }


    try {

        const formData =
            new FormData();


        formData.append(
            "id",
            id
        );


        const response =
            await fetch(
                "api/delete_patient.php",
                {
                    method: "POST",
                    body: formData
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                data.message ||
                "Unable to delete patient."
            );

        }


        showNotification(
            "Patient deleted successfully."
        );


        await loadPatients();


    } catch (error) {

        console.error(error);


        showNotification(
            error.message,
            true
        );

    }

}


// ======================================================
// NOTIFICATION
// ======================================================

function showNotification(
    message,
    isError = false
) {

    notificationMessage.textContent =
        message;


    notification.style.background =
        isError
            ? "#dc2626"
            : "#0f172a";


    notification.classList.add(
        "show"
    );


    setTimeout(
        () => {

            notification.classList.remove(
                "show"
            );

        },
        3500
    );

}


// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(dateString) {

    if (!dateString) {

        return "-";

    }


    const date =
        new Date(
            dateString.replace(" ", "T")
        );


    if (isNaN(date.getTime())) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ======================================================
// SECURITY
// Escape values before putting database data into HTML
// ======================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ======================================================
// INITIALIZE APPLICATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadPatients();

    }
);