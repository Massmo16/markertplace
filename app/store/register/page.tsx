'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { StoreDetailsForm } from './components/store-details-form'
import { BusinessDetailsForm } from './components/business-details-form'
import { StoreCustomizationForm } from './components/store-customization-form'
import { StoreVerificationForm } from './components/store-verification-form'

const steps = [
  { id: 1, name: 'Store Details' },
  { id: 2, name: 'Business Information' },
  { id: 3, name: 'Customization' },
  { id: 4, name: 'Verification' },
]

export default function StoreRegistrationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const selectedPlan = localStorage.getItem('selectedPlan')
    if (!selectedPlan) {
      router.push('/subscription')
      return
    }
  }, [router])

  const [formData, setFormData] = useState({
    selectedPlan: JSON.parse(localStorage.getItem('selectedPlan') || '{}'),
    // Store Details
    storeName: '',
    storeDescription: '',
    storeUrl: '',
    // Business Details
    businessName: '',
    registrationNumber: '',
    taxNumber: '',
    businessAddress: '',
    // Customization
    logo: '',
    bannerImage: '',
    primaryColor: '#000000',
    // Verification
    email: '',
    phone: '',
    identityDocument: '',
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      try {
        const finalData = {
          ...formData,
          selectedPlan: formData.selectedPlan
        }
        
        // Make API call to create store
        // await createStore(finalData)

        // Clear the selected plan from localStorage
        localStorage.removeItem('selectedPlan')
        
        // Redirect to dashboard
        router.push('/store/dashboard')
      } catch (error) {
        console.error('Error creating store:', error)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  return (
    <div className="container max-w-3xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Set Up Your Store
        </h1>
        <p className="text-muted-foreground text-center">
          Complete the following steps to create your store
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Step {currentStep} of {steps.length}</CardTitle>
              <CardDescription>{steps[currentStep - 1].name}</CardDescription>
            </div>
            <Progress value={progress} className="w-[100px]" />
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <StoreDetailsForm 
              data={formData} 
              updateData={updateFormData} 
            />
          )}
          {currentStep === 2 && (
            <BusinessDetailsForm 
              data={formData} 
              updateData={updateFormData} 
            />
          )}
          {currentStep === 3 && (
            <StoreCustomizationForm 
              data={formData} 
              updateData={updateFormData} 
            />
          )}
          {currentStep === 4 && (
            <StoreVerificationForm 
              data={formData} 
              updateData={updateFormData} 
            />
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 