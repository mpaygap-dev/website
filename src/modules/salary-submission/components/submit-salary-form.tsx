import * as React from 'react';
import { useForm } from 'react-hook-form';

import { countryOptions } from '@/lib/country-options';

import { ErrorAlert } from '@/components/alert';
import { Button } from '@/components/buttons';
import { Form } from '@/components/form';
import { formatErrors } from '@/components/form/form';
import { Stepper } from '@/components/stepper';

export const SubmitSalaryForm = () => {
  const [formIndex, setFormIndex] = React.useState(0);
  const [personalDetails, setPersonalDetails] = React.useState<
    PersonalDetailsData | undefined
  >(undefined);
  const [salaryDetails, setSalaryDetails] = React.useState<
    SalaryDetails | undefined
  >(undefined);
  const [thoughts, setThoughts] = React.useState<
    ThoughtsAndVerificationDetails | undefined
  >(undefined);

  return (
    <div>
      <Stepper
        activeIndex={formIndex}
        onChange={setFormIndex}
        steps={[
          { label: 'Getting to Know You' },
          { label: 'Breaking Wage Taboo' },
          { label: 'Thoughts & Verifications' },
        ]}
        className='mb-8'
      />
      {formIndex === 0 && (
        <SubmitSalaryPersonalDetailsForm
          initialValues={personalDetails}
          onComplete={(details) => {
            setPersonalDetails(details);
            setFormIndex(1);
          }}
        />
      )}
      {formIndex === 1 && (
        <SubmitSalarySalaryDetailsForm
          initialValues={salaryDetails}
          onComplete={(salary) => {
            setSalaryDetails(salary);
            setFormIndex(2);
          }}
        />
      )}
      {formIndex === 2 && (
        <SubmitSalaryThoughtsAndVerificationForm
          initialValues={thoughts}
          onComplete={(th) => {
            setThoughts(th);
          }}
        />
      )}
    </div>
  );
};

interface PersonalDetailsData {
  age: string;
  gender: string;
  nationality: string;
  race?: string;
  education?: string;
}

const labelForPersonalDetails: Record<keyof PersonalDetailsData, string> = {
  age: 'Age (Umur)',
  gender: 'Gender identity (Jantina)',
  nationality: 'Nationality (Warganegara)',
  race: 'Race (Kaum)',
  education:
    'What is your highest education qualification? (Apakah kelayakan pendidikan tertinggi anda?)',
};

const SubmitSalaryPersonalDetailsForm = (props: {
  initialValues?: PersonalDetailsData;
  onComplete: (data: Required<PersonalDetailsData>) => void;
}) => {
  const form = useForm<PersonalDetailsData>({
    defaultValues: props.initialValues || {
      age: '',
      gender: '',
      nationality: '',
    },
  });

  const { formState, handleSubmit } = form;

  const formErrors = formatErrors(formState.errors, labelForPersonalDetails);

  return (
    <Form
      form={form}
      onSubmit={handleSubmit((values) => {
        props.onComplete(values as any);
      })}
    >
      <div className='space-y-8'>
        <ErrorAlert errors={formErrors} />
        <div className='grid md:grid-cols-2 gap-8'>
          <Form.NumberField
            label={labelForPersonalDetails.age}
            name='age'
            min={12}
            required
            decimalPlaces={0}
          />
          <Form.DropdownField
            label={labelForPersonalDetails.gender}
            name='gender'
            required
          >
            <option value=''>Please choose</option>
            <option value='female' label='Female' />
            <option value='male' label='Male' />
            <option value='others' label='Non-binary/others' />
          </Form.DropdownField>
        </div>
        <Form.RadioField
          label={labelForPersonalDetails.race}
          name='race'
          required
          layout='horizontal'
          options={[
            {
              label: 'Malay',
              value: 'Malay',
            },
            {
              label: 'Indian',
              value: 'Indian',
            },
            {
              label: 'Chinese',
              value: 'Chinese',
            },
            {
              label: 'Sarawakian Ethic',
              value: 'Sarawakian Ethic',
            },
            {
              label: 'Sabahan Ethic',
              value: 'Sabahan Ethic',
            },
          ]}
          allowOthers
        />
        <Form.DropdownField
          label={labelForPersonalDetails.nationality}
          name='nationality'
          required
        >
          <option value=''>Please choose</option>
          {countryOptions.map((country) => (
            <option value={country.value} key={country.value}>
              {country.label}
            </option>
          ))}
        </Form.DropdownField>
        <Form.RadioField
          label={labelForPersonalDetails.education}
          name='education'
          required
          options={[
            {
              label: 'High School (Sekolah Menengah)',
              value: 'High School (Sekolah Menengah)',
            },
            {
              label: 'Professional Certification(s) (Sijil Profesional)',
              value: 'Professional Certification(s) (Sijil Profesional)',
            },
            {
              label: 'Diploma',
              value: 'Diploma',
            },
            {
              label: "Bachelor's Degree (Ijazah Sarjana Muda)",
              value: "Bachelor's Degree (Ijazah Sarjana Muda)",
            },
            {
              label: "Bachelor's Degree (Overseas)",
              value: "Bachelor's Degree (Overseas)",
            },
            {
              label: "Master's Degree",
              value: "Master's Degree",
            },
            {
              label: "Master's Degree (Overseas)",
              value: "Master's Degree (Overseas)",
            },
            {
              label: 'PhD',
              value: 'PhD',
            },
            {
              label: 'PhD (Overseas)',
              value: 'PhD (Overseas)',
            },
          ]}
          allowOthers
        />
        <div>
          <Button type='submit' className='w-full justify-center'>
            NEXT
          </Button>
        </div>
      </div>
    </Form>
  );
};

interface SalaryDetails {
  jobTitle: string;
}

const labelForSalarylDetails: Record<keyof SalaryDetails, string> = {
  jobTitle: 'Job title (Pekerjaan Anda)',
};

const SubmitSalarySalaryDetailsForm = (props: {
  initialValues?: SalaryDetails;
  onComplete: (data: Required<SalaryDetails>) => void;
}) => {
  const form = useForm({
    defaultValues: props.initialValues || {
      jobTitle: '',
    },
  });

  const { formState, handleSubmit } = form;
  const formErrors = formatErrors(formState.errors, labelForSalarylDetails);

  return (
    <Form form={form} onSubmit={handleSubmit(props.onComplete)}>
      <div className='space-y-8'>
        <ErrorAlert errors={formErrors} />
        <Form.TextField
          name='jobTitle'
          label={labelForSalarylDetails.jobTitle}
          required
          minLength={2}
        />
        <div>
          <Button type='submit' className='w-full justify-center'>
            NEXT
          </Button>
        </div>
      </div>
    </Form>
  );
};

interface ThoughtsAndVerificationDetails {
  thoughts: string;
}

const labelForThoughts: Record<keyof ThoughtsAndVerificationDetails, string> = {
  thoughts:
    'Additional thoughts/insights you would like to share (Kongsikan pendapat / luahan hati anda)',
};

const SubmitSalaryThoughtsAndVerificationForm = (props: {
  initialValues?: ThoughtsAndVerificationDetails;
  onComplete: (data: Required<ThoughtsAndVerificationDetails>) => void;
}) => {
  const form = useForm({
    defaultValues: props.initialValues || {
      thoughts: '',
    },
  });

  const { formState, handleSubmit } = form;
  const formErrors = formatErrors(formState.errors, labelForThoughts);

  return (
    <Form form={form} onSubmit={handleSubmit(props.onComplete)}>
      <div className='space-y-8'>
        <ErrorAlert errors={formErrors} />
        <Form.TextareaField name='thoughts' label={labelForThoughts.thoughts} />
        <div>
          <Button type='submit' className='w-full justify-center'>
            SUBMIT
          </Button>
        </div>
      </div>
    </Form>
  );
};
