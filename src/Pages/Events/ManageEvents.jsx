import React, { useEffect, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import moment from "moment";
import "./Events.css";
import { addEvent, getEvents } from "../../Services/eventService";
import ToasterAlert from "../../toaster/ToasterAlert";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
const initialState = {
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  color: "",
};

const ManageEvents = () => {
  const [modelshow, setModalShow] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    setLoader(true);
    try {
      const response = await getEvents();
      if (response?.success) {
        setEvents(response?.data || []);
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching Events");
      console.error("Error fetching Events:", error);
    } finally {
      setLoader(false);
    }
  };

  //   useEffect(() => {
  //     const curYear = moment().format("YYYY");
  //     const curMonth = moment().format("MM");

  //     const sptCalendarEvents = {
  //       id: 1,
  //       events: [
  //         {
  //           id: "1",
  //           start: `${curYear}-${curMonth}-02`,
  //           end: `${curYear}-${curMonth}-03`,
  //           title: "Spruko Meetup",
  //           className: "bg-secondary-transparent",
  //         },
  //         {
  //           id: "2",
  //           start: `${curYear}-${curMonth}-17`,
  //           end: `${curYear}-${curMonth}-17`,
  //           title: "Design Review",
  //           className: "bg-info-transparent",
  //         },
  //       ],
  //     };

  //     const sptBirthdayEvents = {
  //       id: 2,
  //       className: "bg-info-transparent",
  //       textColor: "#fff",
  //       events: [
  //         {
  //           id: "7",
  //           start: `${curYear}-${curMonth}-04`,
  //           title: "Harcates Birthday",
  //         },
  //       ],
  //     };
  //     const sptHolidayEvents = {
  //       id: 3,
  //       className: "bg-danger-transparent",
  //       textColor: "#fff",
  //       events: [
  //         {
  //           id: "10",
  //           start: `${curYear}-${curMonth}-05`,
  //           end: `${curYear}-${curMonth}-08`,
  //           title: "Festival Day",
  //         },
  //       ],
  //     };
  //     const sptOtherEvents = {
  //       id: 4,
  //       className: "bg-info-transparent",
  //       textColor: "#fff",
  //       events: [
  //         {
  //           id: "13",
  //           start: `${curYear}-${curMonth}-07`,
  //           end: `${curYear}-${curMonth}-09`,
  //           title: "My Rest Day",
  //         },
  //       ],
  //     };

  //     const containerEl = document.getElementById("external-events");
  //     if (containerEl) {
  //       new Draggable(containerEl, {
  //         itemSelector: ".fc-event",
  //         eventData: (eventEl) => ({
  //           title: eventEl.innerText.trim(),
  //           className: eventEl.className + " overflow-hidden",
  //         }),
  //       });
  //     }

  //     const calendarEl = document.getElementById("calendar2");
  //     if (calendarEl) {
  //       const calendar = new Calendar(calendarEl, {
  //         plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  //         headerToolbar: {
  //           left: "prev,next today",
  //           center: "title",
  //           right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  //         },
  //         navLinks: true,
  //         businessHours: true,
  //         editable: true,
  //         selectable: true,
  //         selectMirror: true,
  //         droppable: true,
  //         dayMaxEvents: true,
  //         eventSources: [
  //           sptCalendarEvents,
  //           sptBirthdayEvents,
  //           sptHolidayEvents,
  //           sptOtherEvents,
  //         ],
  //         select: (arg) => {
  //           const title = prompt("Event Title:");
  //           if (title) {
  //             calendar.addEvent({
  //               title,
  //               start: arg.start,
  //               end: arg.end,
  //               allDay: arg.allDay,
  //             });
  //           }
  //           calendar.unselect();
  //         },
  //         eventClick: (arg) => {
  //           if (window.confirm("Are you sure you want to delete this event?"))
  //             arg.event.remove();
  //         },
  //       });
  //       calendar.render();
  //     }
  //     fetchEvents();
  //   }, []);
  useEffect(() => {
    const initializeCalendar = (eventsData) => {
      const calendarEl = document.getElementById("calendar2");
      if (!calendarEl) return;

      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        editable: true,
        selectable: true,
        droppable: true,
        events: eventsData.map((evt) => ({
          id: evt.id,
          title: evt.title,
          start: evt.startDate,
          end: evt.endDate,
          description: evt.description,
          backgroundColor: evt.color,
          borderColor: evt.color,
          textColor: "#fff",
        })),
        // eventDidMount: (info) => {
        //   info.el.style.backgroundColor =
        //     info.event.extendedProps.backgroundColor;
        //   info.el.style.color = "blue";
        //   info.el.style.borderRadius = "6px";
        //   info.el.style.padding = "2px 6px";
        // },

        eventClick: (arg) => {
          alert(
            `Event: ${arg.event.title}\nDescription: ${arg.event.extendedProps.description}`
          );
        },
      });

      calendar.render();
    };

    const fetchAndRenderEvents = async () => {
      setLoader(true);
      try {
        const response = await getEvents();
        if (response?.success) {
          const eventsData = response.data || [];
          setEvents(eventsData);
          initializeCalendar(eventsData);
        }
      } catch (error) {
        toast.error(error?.message || "Error fetching Events");
        console.error("Error fetching Events:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchAndRenderEvents();
  }, []); // empty dependency, runs once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Title is required";
    if (!formData.startDate) tempErrors.startDate = "Start Date is required";
    if (!formData.endDate) tempErrors.endDate = "End Date is required";
    else if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    )
      tempErrors.endDate = "End Date cannot be before Start Date";
    if (!formData.color) tempErrors.color = "Background color is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };
    setLoader(true);
    try {
      const response = await addEvent(data);
      if (response?.success) {
        toast.success(response?.message);
        setFormData(initialState);
        setErrors({});
        setModalShow(false);
      }
    } catch (error) {
      console.error("Error saving Details:", error);
      toast.error(error?.message);
    } finally {
      setLoader(false);
    }
  };
  const role = localStorage.getItem("UserRole");

  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">Full Calendar</h1>
              <div className>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="javascript:void(0);">Apps</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Full Calendar
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            {/* <div>
            <button className="btn btn-primary-light btn-wave me-2 waves-effect waves-light">
              <i className="bx bx-crown align-middle" /> Plan Upgrade
            </button>
            <button className="btn btn-secondary-light btn-wave me-0">
              <i className="ri-upload-cloud-line align-middle" /> Export Report
            </button>
          </div> */}
          </div>
          {/* Page Header Close */}
          {/* Start::row-1 */}
          <div className="row">
            <div className="col-xl-3">
              <div className="card custom-card">
                <div className="card-body p-0">
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold">Activity :</h6>
                      <button className="btn btn-primary-light btn-sm btn-wave">
                        View All
                      </button>
                    </div>
                  </div>
                  <div
                    className="p-3 border-bottom activity-scroll"
                    id="full-calendar-activity"
                  >
                    <ul className="list-unstyled mb-0 fullcalendar-events-activity">
                      <li>
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <p className="mb-1 fw-medium">Monday, Jan 1,2024</p>
                          <span className="badge bg-light text-default mb-1">
                            12:00PM - 1:00PM
                          </span>
                        </div>
                        <p className="mb-0 text-muted fs-12">
                          Meeting with a client about new project requirement.
                        </p>
                      </li>
                      <li>
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <p className="mb-1 fw-medium">
                            Thursday, Dec 29,2022
                          </p>
                          <span className="badge bg-success mb-1">
                            Completed
                          </span>
                        </div>
                        <p className="mb-0 text-muted fs-12">
                          Birthday party of niha suka
                        </p>
                      </li>
                      <li>
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <p className="mb-1 fw-medium">
                            Wednesday, Jan 3,2024
                          </p>
                          <span className="badge bg-warning-transparent mb-1">
                            Reminder
                          </span>
                        </div>
                        <p className="mb-0 text-muted fs-12">
                          WOrk taget for new project is completing
                        </p>
                      </li>
                      <li>
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <p className="mb-1 fw-medium">Friday, Jan 20,2024</p>
                          <span className="badge bg-light text-default mb-1">
                            06:00PM - 09:00PM
                          </span>
                        </div>
                        <p className="mb-0 text-muted fs-12">
                          Watch new movie with family
                        </p>
                      </li>
                      <li>
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <p className="mb-1 fw-medium">
                            Saturday, Jan 07,2024
                          </p>
                          <span className="badge bg-danger-transparent mb-1">
                            Due Date
                          </span>
                        </div>
                        <p className="mb-0 text-muted fs-12">
                          Last day to pay the electricity bill and water
                          bill.need to check the bank details.
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4">
                    <img
                      src="assets/images/media/svg/2.svg"
                      className="full-calendar-image img-fluid d-flex mx-auto mx-xl-0"
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="card custom-card">
                <div className="card-header justify-content-between">
                  <div className="card-title">All Events</div>
                  {(role === "admin" || role === "manager") && (
                    <button
                      className="btn btn-primary btn-wave"
                      data-bs-toggle="modal"
                      data-bs-target="#eventsModal"
                      onClick={() => setModalShow(true)}
                    >
                      <i className="ri-add-line align-middle me-1 fw-medium d-inline-block" />
                      Create New Event
                    </button>
                  )}
                </div>
                <div className="card-body p-0">
                  <div
                    id="external-events"
                    className="p-3 d-flex align-items-center flex-wrap gap-3"
                  >
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"
                        style={{
                          backgroundColor: event.color,
                          borderRadius: "6px",
                          padding: "4px 8px",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <div className="fc-event-main text-primary">
                          {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card custom-card">
                <div className="card-header">
                  <div className="card-title">Full Calendar</div>
                </div>
                <div className="card-body">
                  <div id="calendar2" />
                </div>
              </div>
            </div>
          </div>
          {/*End::row-1 */}
        </div>
      </div>
      {modelshow && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalShow(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-6">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        type="date"
                        className={`form-control ${
                          errors.startDate ? "is-invalid" : ""
                        }`}
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                      {errors.startDate && (
                        <div className="invalid-feedback">
                          {errors.startDate}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="endDate">End Date</label>
                      <input
                        type="date"
                        className={`form-control ${
                          errors.endDate ? "is-invalid" : ""
                        }`}
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                      {errors.endDate && (
                        <div className="invalid-feedback">{errors.endDate}</div>
                      )}
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label htmlFor="color">Background Color</label>
                      <input
                        type="color"
                        className={`form-control ${
                          errors.color ? "is-invalid" : ""
                        }`}
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                      />
                      {errors.color && (
                        <div className="invalid-feedback">{errors.color}</div>
                      )}
                    </div>
                    <div className="col-md-12 mt-4">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        className={`form-control ${
                          errors.description ? "is-invalid" : ""
                        }`}
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageEvents;
