import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VendorUpdateAboutCompanyForm from "../../components/Forms/Vendor/VendorUpdateAboutCompanyForm";
import VendorUpdateCompanyInformationForm from "../../components/Forms/Vendor/VendorUpdateCompanyInformationForm";
import VendorUpdatePersonalInfarmationForm from "../../components/Forms/Vendor/VendorUpdatePersonalInfarmationForm";
import VendorUpdatePhotoAndVideoForm from "../../components/Forms/Vendor/VendorUpdatePhotoAndVideoForm";
import VendorUpdateServiceDetailsForm from "../../components/Forms/Vendor/VendorUpdateServiceDetailsForm";
import VendorUpdateSocialNetvorksForm from "../../components/Forms/Vendor/VendorUpdateSocialNetvorksForm";
import Security from "../../components/Security";
import { connect, useSelector } from "react-redux";

function VendorAccount({ vendorData }) {
  const { id } = useParams();
  useEffect(() => {
    const selector = document.querySelector(`[data-to="${id}"]`);
    if (!selector) return;

    const { offsetTop } = selector;

    window.scrollTo({
      top: offsetTop - 80,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <section className="account">
      <VendorUpdatePersonalInfarmationForm
        name={vendorData.firstName}
        surname={vendorData.surname}
        mail={vendorData.email}
        img={vendorData.vendorModel.photos.find(photo => photo.type === "AVATAR")}
        phone={vendorData.phoneNumber}
      />
      <VendorUpdateCompanyInformationForm
        name={vendorData.vendorModel.companyName}
        amount={vendorData.vendorModel.yearsOnMarket}
        file={vendorData.vendorModel.photos.find(photo => photo.type === "COMPANY_AVATAR")}
        city={vendorData.city}
        serviceType={vendorData.vendorModel.fieldOfActivity}
        county={vendorData.vendorModel.country}
      />
      <VendorUpdateServiceDetailsForm />
      <VendorUpdateAboutCompanyForm
        title={vendorData.vendorModel.companyTitle}
        description={vendorData.vendorModel.companyDescription}
        aboutCompany={vendorData.vendorModel.aboutCompany}
        aboutTeam={vendorData.vendorModel.aboutTeam}
        file={vendorData.vendorModel.photos.find(file => file.type === "COMPANY_AVATAR")}
      />
      <VendorUpdatePhotoAndVideoForm />
      <VendorUpdateSocialNetvorksForm
        instagram={vendorData.vendorModel.instagram}
        facebook={vendorData.vendorModel.facebook}
        twitter={vendorData.vendorModel.twitter}
        youtube={vendorData.vendorModel.youtube}
        tiktok={vendorData.vendorModel.tiktok}
      />
      <Security />
    </section>
  );
}
const mapStateToProps = function (state) {
  return {
    vendorData: state.userInfo.userData,

  };
};
export default connect(mapStateToProps)(VendorAccount);