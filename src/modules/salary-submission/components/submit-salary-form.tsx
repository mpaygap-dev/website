import * as React from 'react';
import { useForm } from 'react-hook-form';

import { countryOptions } from '@/lib/country-options';

import { Button } from '@/components/buttons';
import { Form } from '@/components/form';
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

const SubmitSalaryPersonalDetailsForm = (props: {
  initialValues?: PersonalDetailsData;
  onComplete: (data: Required<PersonalDetailsData>) => void;
}) => {
  const { control, handleSubmit } = useForm<PersonalDetailsData>({
    defaultValues: props.initialValues || {
      age: '',
      gender: '',
      nationality: '',
    },
  });

  return (
    <Form
      control={control}
      onSubmit={handleSubmit((values) => {
        props.onComplete(values as any);
      })}
    >
      <div className='space-y-8'>
        <div className='grid md:grid-cols-2 gap-8'>
          <Form.TextField
            label='Age (Umur)'
            name='age'
            type='number'
            min={12}
            rules={{ min: 12 }}
            required
          />
          <Form.DropdownField
            label='Gender identity (Jantina)'
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
          label='Race (Kaum)'
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
          label='Nationality (Warganegara)'
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
          label='What is your highest education qualification? (Apakah kelayakan pendidikan tertinggi anda?)'
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

const SubmitSalarySalaryDetailsForm = (props: {
  initialValues?: SalaryDetails;
  onComplete: (data: Required<SalaryDetails>) => void;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: props.initialValues || {
      jobTitle: '',
    },
  });

  return (
    <Form control={control} onSubmit={handleSubmit(props.onComplete)}>
      <div className='space-y-8'>
        <Form.TextField
          name='jobTitle'
          label='Job title (Pekerjaan Anda)'
          required
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

const SubmitSalaryThoughtsAndVerificationForm = (props: {
  initialValues?: ThoughtsAndVerificationDetails;
  onComplete: (data: Required<ThoughtsAndVerificationDetails>) => void;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: props.initialValues || {
      thoughts: '',
    },
  });

  return (
    <Form control={control} onSubmit={handleSubmit(props.onComplete)}>
      <div className='space-y-8'>
        <Form.TextareaField
          name='thoughts'
          label='Additional thoughts/insights you would like to share: (Kongsikan pendapat / luahan hati anda:)'
        />
        <div>
          <Button type='submit' className='w-full justify-center'>
            SUBMIT
          </Button>
        </div>
      </div>
    </Form>
  );
};
