import { Controller, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Select from "react-select";
import { FieldError } from "../../UI/FieldError";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaVendorCompanyInformation } from "../../../validation/schemas";
import f from "../../../validation/fieldName";
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const VendorCompanyInformationForm = ({ onCallback, onBack }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorCompanyInformation()),
  });
  const optionTypes = [
    { value: "Business Category", label: "Business Category" },
    { value: "Wedding Bands", label: "Wedding Bands" },
    { value: "Wedding Cakes", label: "Wedding Cakes" },
    { value: "Wedding Dresses", label: "Wedding Dresses" },
    { value: "Wedding Hair & Makeup", label: "Wedding Hair & Makeup" },
    { value: "Wedding Photographers", label: "Wedding Photographers" },
    { value: "Wedding Planners", label: "Wedding Planners" },
    { value: "Bar Services & Beverages", label: "Bar Services & Beverages" },
    { value: "Caterers", label: "Caterers" },
    { value: "Dance Lessons", label: "Dance Lessons" },
    { value: "DJs", label: "DJs" },
    { value: "Musicians", label: "Musicians" },
    { value: "Favors", label: "Favors" },
    { value: "Florists", label: "Florists" },
    { value: "Invitations", label: "Invitations" },
    { value: "Officiants", label: "Officiants" },
    { value: "Photo Booths", label: "Photo Booths" },
    { value: "Venue", label: "Venue" },
    { value: "Rehearsal Dinner", label: "Rehearsal Dinner" },
    { value: "Rentals", label: "Rentals" },
    { value: "Limos", label: "Limos" },
    { value: "Videographers", label: "Videographers" },



  ];
  const optionsState = [
    { value: "Alabama", label: "Alabama" },
    { value: "Alaska", label: "Alaska" },
    { value: "Arizona", label: "Arizona" },
    { value: "Arkansas", label: "Arkansas" },
    { value: " California", label: " California" },
    { value: "Colorado", label: "Colorado" },
    { value: " Connecticut", label: "Connecticut" },
    { value: "Delaware", label: "Delaware" },
    { value: " Florida", label: " Florida" },
    { value: " Georgia", label: " Georgia" },
    { value: " Hawaii", label: " Hawaii" },
    { value: " Idaho", label: " Idaho" },
    { value: "Illinois", label: "Illinois" },
    { value: " Indiana", label: "Indiana" },
    { value: "  Iowa", label: " Iowa" },
    { value: "  Kansas", label: " Kansas" },
    { value: " Kentucky", label: "Kentucky" },
    { value: "  Louisiana", label: " Louisiana" },
    { value: " Maine", label: "Maine" },
    { value: "   Massachusetts", label: " Massachusetts" },
    { value: "   Michigan", label: " Michigan" },
    { value: "   Mississippi", label: " Mississippi" },
    { value: "   Missouri", label: " Missouri" },
    { value: "  Montana", label: "Montana" },
    { value: "   Nebraska", label: " Nebraska" },
    { value: "   Nevada", label: " Nevada" },
    { value: "   New Hampshire", label: " New Hampshire" },
    { value: "    New Jersey", label: "  New Jersey" },
    { value: "    New Mexico", label: "  New Mexico" },
    { value: "     New York", label: "  New York" },
    { value: "    North Carolina", label: "  North Carolina" },
    { value: "    North Dakota", label: "North Dakota" },
    { value: "    Ohio", label: "   Ohio" },
    { value: "      Oregon", label: "    Oregon" },
    { value: "     Pennsylvania", label: "   Pennsylvania" },
    { value: "      Rhode Island", label: "    Rhode Island" },
    { value: "      South Carolina", label: "    South Carolina" },
    { value: "      South Dakota  ", label: "    South Dakota  " },
    { value: "    Texas ", label: "     Texas " },
    { value: "     Utah", label: "   Utah" },
    { value: "      Vermont", label: "    Vermont" },
    { value: "      Washington", label: "    Washington" },
    { value: "      West Virginia", label: "   West Virginia" },
    { value: "       Wisconsin", label: "    Wisconsin" },
    { value: "      Wyoming", label: " Wyoming" },
  ];
  const theme = useContext(ThemeContext);

  const isValidField = (field) => !errors[field];
  const getErrorField = (field) => errors[field]?.message;

  return (
    <form onSubmit={handleSubmit(onCallback)}>
      <Input
        type="text"
        placeholder="Company Name"
        label="Company Name"
        register={register(f.name)}
        error={getErrorField(f.name)}
        isValid={isValidField(f.name)}
      />
      <label className="input-label">
        Service Type
        <Controller
          control={control}
          name={f.type}
          render={({ field }) => (
            <Select
              placeholder="Service Type"
              options={optionTypes}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        {!isValidField(f.type) && <FieldError text={getErrorField(f.type)} />}
      </label>
      <Input
        type="text"
        placeholder="Years on Market"
        label="Years on Market"
        register={register(f.amount)}
        error={getErrorField(f.amount)}
        isValid={isValidField(f.amount)}
      />
      <div className="input-row">
        <div>
          <label className="input-label">
            State
            <Controller
              control={control}
              name={f.state}
              render={({ field }) => (
                <Select
                  placeholder="State"
                  options={optionsState}
                  isClearable={false}
                  isSearchable={false}
                  {...field}
                  {...customReactSelectOptions(theme.get())}
                />
              )}
            />
            {!isValidField(f.state) && (
              <FieldError text={getErrorField(f.state)} />
            )}
          </label>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Country"
            label="County"
            register={register(f.country)}
            error={getErrorField(f.country)}
            isValid={isValidField(f.country)}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="btn btn-accent btn-circle m-t-24" onClick={onBack}>
          <i className="icon-arrow-line"></i>
        </div>
        <Button
          className="btn btn-accent w-100 m-t-24"
          style={{ flex: 1 }}
          disabled={!isValid}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default VendorCompanyInformationForm;
