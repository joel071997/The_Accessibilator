// Importing necessary React and Next.js components
import React, { useContext, useEffect, useState } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Head from 'next/head';
import Image from 'next/image';
import { FONT_STYLE_OPTIONS } from '../../configs/selectOptions';
import Button from '../../components/UI/Button';
import SlideModal from '../../components/UI/SlideModal';
import CustomisationPanel from '../../components/CustomisationPanel/CustomisationPanel';
import { AuthContext } from '../../contexts/AuthContext';
import IsProtectedRoute from '../../hoc/IsProtectedRoute';
import axiosInit from '../../services/axios';
import { ToastQueue } from '@react-spectrum/toast';
import { reportException } from '../../services/errorReporting';
import MyModal from '../../components/UI/MyModal';
import { HashLoader } from 'react-spinners';
import { is } from 'date-fns/locale';

// Default settings for document modification parameters
const defaultSettings: DocModifyParams = {
  fontType: 'arial',
  fontSize: 12,
  lineSpacing: 1.5,
  fontColor: '000000',
  backgroundColor: 'FFFFFF',
  characterSpacing: 2.5,
  removeItalics: true,
  alignment: 'LEFT',
  generateTOC: false,
  borderGeneration: false,
  headerGeneration: false,
  paragraphSplitting: false,
  syllableSplitting: false,
  handlePunctuations: false,
};

const PresetsPage = () => {
  // Using the context Object to access the authentication-related data
  const { user, logout, fetchUser, token } = useContext(AuthContext);

  // Define the state hooks to manage user settings and modal visibility
  const [userSettings, setUserSettings] = useState({
    ...defaultSettings,
  });
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const [isUserPresetLoading, setIsUserPresetLoading] = useState(true);
  const [isDeleteAccountLoading, setIsDeleteAccountLoading] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  /**
   * Define the async function for fetching user's preset configurations
   * @returns The user pre-defined settings
   */
  const fetchUserPresets = async () => {
    setIsUserPresetLoading(true);
    try {
      const fetchUserRes = await axiosInit.get<{ user: User | null }>(
        '/api/user/me'
      );
      const currUserPresets = fetchUserRes?.data?.user?.userPresets;

      setIsUserPresetLoading(false);
      return Promise.resolve(currUserPresets);
    } catch (err) {
      ToastQueue.negative(
        `Failed to load settings! ${
          err?.response?.data.detail || err?.message || ''
        }`,
        {
          timeout: 3000,
        }
      );
      setIsUserPresetLoading(false);
      return Promise.reject(err);
    }
  };

  const loader = (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <HashLoader
        loading={true}
        color='#451a03'
        size={'120px'}
        aria-description='Deleting Account...'
      />
      <p className='mt-6 text-lg'>Deleting Account...</p>
    </div>
  );

  // Define the useEffect hook to fetch the user presets on component mount
  useEffect(() => {
    fetchUserPresets().then((value) => {
      !!value && setUserSettings((state) => ({ ...state, ...value }));
    });
  }, []);

  // Define the function for handling the save action of user configurations
  const onSaveConfig = (userPresetData: DocModifyParams) => {
    setIsUserPresetLoading(true);

    axiosInit
      .post<DocumentData>('/api/user/presets', {
        ...userPresetData,
        characterSpacing: !!userPresetData.characterSpacing
          ? userPresetData?.characterSpacing * 10
          : userPresetData?.characterSpacing,
      })
      .then((res) => {
        setUserSettings({
          ...userPresetData,
          characterSpacing: !!userPresetData.characterSpacing
            ? userPresetData?.characterSpacing * 10
            : userPresetData?.characterSpacing,
        }),
          ToastQueue.positive('Settings saved successfully', {
            timeout: 3000,
          });
        fetchUser(user);
        setSlideModalOpen(false);
      })
      .catch((err) => {
        // console.log(err);
        ToastQueue.negative(
          `An error occurred! ${
            err?.response?.data.detail || err?.message || ''
          }`,
          {
            timeout: 3000,
          }
        );
        reportException(err, {
          category: 'presets',
          message: 'Failed to set user presets',
          data: {
            origin: 'Presets Screen',
          },
        });
      })
      .finally(() => {
        setIsUserPresetLoading(false);
      });
  };

  const onDeleteConfirm = () => {
    setIsDeleteAccountLoading(true);

    axiosInit
      .delete('/api/user')
      .then((res) => {
        ToastQueue.neutral('Account deleted successfully', {
          timeout: 3000,
        });
        logout();
      })
      .catch((err) => {
        // console.log(err);
        ToastQueue.negative(
          `An error occurred! ${
            err?.response?.data.detail || err?.message || ''
          }`,
          {
            timeout: 3000,
          }
        );
        reportException(err, {
          category: 'presets',
          message: 'Failed to delete user account',
          data: {
            origin: 'Presets Screen',
          },
        });
      })
      .finally(() => {
        setIsDeleteAccountLoading(false);
      });
  };

  // Parsing the user settings Object to display as preset options
  const presetsArr = [
    `Font Type: ${FONT_STYLE_OPTIONS.find(
      (opt) => opt.id === userSettings.fontType
    )?.name}`,
    `Font Size: ${userSettings.fontSize}px`,
    `Line Spacing: ${userSettings.lineSpacing}`,
    `Letter Spacing: ${
      userSettings.characterSpacing
        ? `${userSettings.characterSpacing * 10}%`
        : ''
    }`,
    `Remove Italics: ${userSettings.removeItalics ? 'Yes' : 'No'}`,
    `Align Text: ${userSettings?.alignment?.toLowerCase()}`,
  ];

  return (
    <>
      <DefaultLayout>
        <Head>
          <title>Accessibilator | My Settings</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className='flex flex-1 flex-col justify-center py-10 pb-8  text-center text-base text-gray-900 md:py-16'>
          <div className='flex flex-1 grid-cols-12 flex-col-reverse justify-between gap-8 px-4 md:grid md:px-8 lg:px-16'>
            <div className='flex items-center justify-between rounded border border-gray-400/60 bg-stone-50 p-8 md:col-span-4 md:flex-col md:justify-normal md:p-10 lg:col-span-3'>
              <div className='flex flex-col items-center '>
                <div>
                  <Image
                    width={256}
                    height={256}
                    src={`https://ui-avatars.com/api/?name=${user?.username}&size=256&length=1&bold=true`}
                    className='max-w-[5rem] rounded-full md:max-w-max'
                    alt='profile name initials'
                  />
                </div>
                <p className='mt-3 text-lg font-semibold md:mt-8'>
                  {user?.username}
                </p>
                <p className='mt-1 font-medium md:mt-3'> {user?.email}</p>
              </div>

              <div className='mt-auto flex flex-col items-center'>
                <Button
                  text='Logout'
                  variant='link'
                  className='btn-link text-lg md:text-base'
                  onClick={() => {
                    logout();
                  }}
                />
                <Button
                  text='Delete Account'
                  variant='link'
                  className='btn-link mt-3 text-lg text-red-700 md:text-base'
                  onClick={() => {
                    setIsDeleteAccountModalOpen(true);
                  }}
                />
              </div>
            </div>

            <div className='flex flex-1 flex-col rounded border border-gray-400/60 bg-stone-50 px-8 py-10 text-left md:col-span-8 md:px-16 lg:col-span-9'>
              <h2 className='text-3xl font-medium'>My Settings</h2>

              <div className='mt-10 flex flex-wrap gap-x-5 gap-y-6 '>
                {presetsArr.map((val, idx) => {
                  return (
                    <div
                      key={idx}
                      className='inline-block rounded-md border-2 border-dashed border-yellow-900 px-5 py-2 text-lg capitalize'
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
              <div className='mb-10 mt-6 inline-flex h-36 w-24 flex-col items-stretch  rounded-md border-2 border-dashed border-yellow-900 p-2 text-lg capitalize'>
                <div
                  className='flex flex-1 flex-col items-center justify-center border border-gray-200 shadow-md'
                  style={{
                    backgroundColor: `#${userSettings.backgroundColor}`,
                    color: `#${userSettings.fontColor}`,
                  }}
                  key={'theme'}
                >
                  <span className='inline-block text-xl font-semibold'>Aa</span>
                  <span className='mt-1 inline-block text-sm'>Theme</span>
                </div>
              </div>

              <div className='mt-auto'>
                <Button
                  className='px-8 py-3 text-lg md:px-6 md:py-2 md:text-base'
                  text={'Modify Settings'}
                  onClick={() => {
                    setSlideModalOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        </main>
      </DefaultLayout>
      {/* Slide Modal for customisation panel */}
      <SlideModal
        open={slideModalOpen}
        setOpen={setSlideModalOpen}
        title={'Customisation Panel'}
      >
        {/* Conditional rendering of Customisation Panel */}
        {userSettings && (
          <CustomisationPanel
            onConfigSave={onSaveConfig}
            configSaveLoading={isUserPresetLoading}
            customisationConfig={userSettings}
          />
        )}
      </SlideModal>
      <MyModal
        title='Leaving us?'
        size='sm'
        isOpen={isDeleteAccountModalOpen}
        onModalClose={() => setIsDeleteAccountModalOpen(false)}
      >
        {isDeleteAccountLoading ? (
          loader
        ) : (
          <>
            <p className='my-4 mt-7'>
              Are you sure you want to delete your account?
            </p>
            <p className='my-4'>
              All your unsaved documents and settings will be lost
            </p>
            <div className='mt-8 flex justify-end'>
              <Button
                variant='link'
                className='mr-10 border border-yellow-900  px-6 py-2 text-base font-medium'
                text={'Cancel'}
                onClick={() => {
                  setIsDeleteAccountModalOpen(false);
                }}
              />

              <Button
                onClick={() => {
                  onDeleteConfirm();
                }}
                text={'Yes, delete account'}
                className='btn btn-primary bg-red-700 px-6 py-2 text-base'
              />
            </div>
          </>
        )}
      </MyModal>
    </>
  );
};

// Wrapping the component with a higher-order component for route protection
export default IsProtectedRoute(PresetsPage);
