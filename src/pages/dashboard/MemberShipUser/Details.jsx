/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';
import { Container, Grid, Stack, Typography, Divider, CardContent, CardHeader, Card } from '@mui/material';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function QA() {
  const { themeStretch } = useSettings();

  const location = useLocation();
  const {
    data: { data },
  } = location.state;

  return (
    <Page title="Membership Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Membership Detail" links={[{ name: '', href: '' }]} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ my: 3 }}>
              <CardHeader title="Person Info" />
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      First Name
                    </Typography>
                    <Typography variant="body1">{data?.first_name === '' ? 'N/A' : data?.first_name}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Last Name
                    </Typography>
                    <Typography variant="body1">{data?.last_name === '' ? 'N/A' : data?.last_name}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Email
                    </Typography>
                    <Typography variant="body1">{data?.email === '' ? 'N/A' : data?.email}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Birthday
                    </Typography>
                    <Typography variant="body1">{data?.birthday === '' ? 'N/A' : data?.birthday}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Relation
                    </Typography>
                    <Typography variant="body1">{data?.relation === '' ? 'N/A' : data?.relation}</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ my: 3 }}>
                <CardHeader title="Person Info" />
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Country
                      </Typography>
                      <Typography variant="body1">{data?.country === '' ? 'N/A' : data?.country}</Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        City
                      </Typography>
                      <Typography variant="body1">{data?.city === '' ? 'N/A' : data?.city}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        state
                      </Typography>
                      <Typography variant="body1">{data?.state === '' ? 'N/A' : data?.state}</Typography>
                    </Stack>

                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Zip Code
                      </Typography>
                      <Typography variant="body1">{data?.zipcode === '' ? 'N/A' : data?.zipcode}</Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Method of communication
                      </Typography>
                      <Typography variant="body1">
                        {data?.method_of_communication === '' ? 'N/A' : data?.method_of_communication}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ my: 3 }}>
                <CardHeader title="Voter Info" />
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Registered Voter{' '}
                      </Typography>
                      <Typography variant="body1">
                        {data?.registered_voter === '' ? 'N/A' : data?.registered_voter}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        What State
                      </Typography>
                      <Typography variant="body1">{data?.what_state === '' ? 'N/A' : data?.what_state}</Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        In What County
                      </Typography>
                      <Typography variant="body1">
                        {data?.in_what_county === '' ? 'N/A' : data?.in_what_county}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ my: 3 }}>
                <CardHeader title="Education Info" />
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Education Completed
                      </Typography>
                      <Typography variant="body1">
                        {data?.education_completed === '' ? 'N/A' : data?.education_completed}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Degree or other Certification
                      </Typography>
                      <Typography variant="body1">
                        {data?.degree_or_other_certification === '' ? 'N/A' : data?.degree_or_other_certification}
                      </Typography>
                    </Stack>

                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Currently Enrolled
                      </Typography>
                      <Typography variant="body1">
                        {data?.currently_enrolled === '' ? 'N/A' : data?.currently_enrolled}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Scholastic Subject
                      </Typography>
                      <Typography variant="body1">
                        {data?.scholastic_subject === '' ? 'N/A' : data?.scholastic_subject}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ my: 3 }}>
                <CardHeader title="Employement Info" />
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Employed
                      </Typography>
                      <Typography variant="body1">{data?.employed === '' ? 'N/A' : data?.employed}</Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        In what field or industry
                      </Typography>
                      <Typography variant="body1">
                        {data?.in_what_field_or_industry === '' ? 'N/A' : data?.in_what_field_or_industry}
                      </Typography>
                    </Stack>

                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Industry Occupation
                      </Typography>
                      <Typography variant="body1">
                        {data?.industry_occupation === '' ? 'N/A' : data?.industry_occupation}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Should focus on for enhancing
                      </Typography>
                      <Typography variant="body1">
                        {data?.should_focus_on_for_enhancing === '' ? 'N/A' : data?.should_focus_on_for_enhancing}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Voting member
                      </Typography>
                      <Typography variant="body1">{data?.voting_membe === '' ? 'N/A' : data?.voting_member}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ my: 3 }}>
                <CardHeader title="Meeting Info" />
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        How many committee meeting
                      </Typography>
                      <Typography variant="body1">
                        {data?.how_many_committee_meeting === '' ? 'N/A' : data?.how_many_committee_meeting}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        General assembly meetings
                      </Typography>
                      <Typography variant="body1">
                        {data?.general_assembly_meetings === '' ? 'N/A' : data?.general_assembly_meetings}
                      </Typography>
                    </Stack>

                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Uplifting acts and progress civic engagements
                      </Typography>
                      <Typography variant="body1">
                        {data?.uplifting_acts_and_progress_civic_engagements === ''
                          ? 'N/A'
                          : data?.uplifting_acts_and_progress_civic_engagements}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Attending the annual convention
                      </Typography>
                      <Typography variant="body1">
                        {data?.attending_the_annual_convention === '' ? 'N/A' : data?.attending_the_annual_convention}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Collaborative & Cooperative work
                      </Typography>
                      <Typography variant="body1">
                        {data?.collaborative_and_cooperative_work === ''
                          ? 'N/A'
                          : data?.collaborative_and_cooperative_work}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ my: 3 }}>
                <CardHeader title="Subscription" />
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Subscription Active
                      </Typography>
                      <Typography variant="body1">{data?.subscription?.is_active ? 'Yes' : 'No'}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Subscription Start Date
                      </Typography>
                      <Typography variant="body1">{data?.subscription?.start_date}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Subscription Expiry Date
                      </Typography>
                      <Typography variant="body1">{data?.subscription?.expiry_date}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Subscription Type
                      </Typography>
                      <Typography variant="body1">{data?.status}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Subscription Plan Id
                      </Typography>
                      <Typography variant="body1">{data?.subscription?.plan_id}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* <Card sx={{ p: 1 }}>
          <CardHeader title="Questionaire" />
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">
              Q. Current Educational Institution (if applicable) and Graduation year
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {data === '' ? 'N/A' : data?.educational_institution_graduation_year}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">Q. Major(s) and Minor(s)</Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {data === '' ? 'N/A' : data?.major_minors}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">
              Q. Are you involved in any extracurriculars? If so, which ones? What do you enjoy in your free time?
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {data === '' ? 'N/A' : data?.extracurriculars}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">
              Q. What are your current career goals? If you are still exploring, describe your journey (classes you’ve
              taken, experiences you’ve had) and what you are currently drawn towards.
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {data === '' ? 'N/A' : data?.career_goals}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">Q. What do you hope to gain with access to this program?</Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {data === '' ? 'N/A' : data?.hope_to_gain_access}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">
              Q. Are there specific levels of care (physicians, nurses, PA, chiropractors, dentists, naturopathic
              doctors, etc) you want to observe? Are you interested in exploring all offerings?
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {data === '' ? 'N/A' : data?.levels_of_care}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">
              Q. Are there specific types of specialties (family medicine, surgery, dermatology, etc) you want to
              observe? Are you interested in exploring all offerings?
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {data === '' ? 'N/A' : data?.specialties}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">Q. Have you shadowed healthcare professionals in the past?</Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {data === '' ? 'N/A' : data?.shadowed_healthcare_professionals}
            </Typography>
          </Box>
          <Divider />
          {data === '' ? 'N/A' : data?.shadowed_healthcare_professionals === 'yes' && (
            <>
              <Box sx={{ m: 3 }}>
                <Typography variant="body1">Q. Which fields and specialties have you shadowed?</Typography>
                <Typography variant="body2" sx={{ color: 'grey.500' }}>
                  {data === '' ? 'N/A' : data?.fields_specialties_shadowed}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ m: 3 }}>
                <Typography variant="body1">
                  Q. How did you obtain these opportunities (family connections, shadowing programs, reaching out to
                  clinics/healthcare providers, etc)?
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.500' }}>
                  {data === '' ? 'N/A' : data?.fields_specialties_shadowed}
                </Typography>
              </Box>
              <Divider />
            </>
          )}
          <Box sx={{ m: 3 }}>
            <Typography variant="body1">Student Signature</Typography>
            <Stack direction="column">
              <Image alt="Test Reprt Image" src={data === '' ? 'N/A' : data?.signature} ratio="16/9" sx={{ borderRadius: 1 }} />
            </Stack>
          </Box>

         <Profile data={data} additionalInfo={additionalInfo} posts={_userFeeds} signature={signature} uploadedID={uploadedID}/>
        </Card> */}
      </Container>
    </Page>
  );
}
