'use client'

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"
import { useAssets } from "@/hooks/useAssets"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AssetDetailsSidebarProps {
  assetId: number
  isOpen: boolean
  onClose: () => void
}

export default function AssetDetailsSidebar({ assetId, isOpen, onClose }: AssetDetailsSidebarProps) {
  const { assets, loading, error } = useAssets()

  if (!isOpen) return null

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  const asset = assets.find(a => a.id === assetId)
  if (!asset) return <div className="p-4">Asset not found</div>

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[640px] border-l shadow-lg z-50 transition-transform duration-300 ease-in-out">
      <Card className="h-full rounded-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sticky top-0 z-10">
          <CardTitle className="text-lg font-semibold">Asset Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">{asset.asset_name}</h3>
            </div>
            
            <Section title="Account Information">
              <InfoItem label="Financial Institution" value={asset.financial_institution || 'N/A'} />
              <InfoItem label="Asset Category" value={asset.asset_category} />
              <InfoItem label="Asset Location" value={asset.asset_location || 'N/A'} />
            </Section>
            
            <Section title="Account Status">
              <InfoItem label="Updated At" value={asset.updated_at.toLocaleString()} />
              <InfoItem label="Account Status" value={asset.account_status} />
            </Section>
            
            <Section title="Value Information">
              <InfoItem label="Current Value" value={`$${asset.current_value.toLocaleString()}`} />
              <InfoItem label="Cost Basis" value={asset.cost_basis ? `$${asset.cost_basis.toLocaleString()}` : 'N/A'} />
              <InfoItem label="Acquisition Date" value={asset.acquisition_date ? new Date(asset.acquisition_date).toLocaleDateString() : 'N/A'} />
              <InfoItem label="Sold" value={asset.sold ? "Yes" : "No"} />
            </Section>
            
            <Section title="Ownership Information">
              <InfoItem label="Account Owner" value={asset.account_owner || 'N/A'} />
              <InfoItem label="Is Probate" value={asset.is_probate ? "Yes" : "No"} />
            </Section>
            
            <Section title="Contact Information">
              <InfoItem label="Contact Name" value={asset.asset_contact_name || 'N/A'} />
              <InfoItem label="Contact Number" value={asset.asset_contact_number || 'N/A'} />
              <InfoItem label="Contact Email" value={asset.asset_contact_email || 'N/A'} />
            </Section>
            
            <Section title="Other Information">
              <InfoItem label="Notes" value={asset.notes || 'N/A'} />
              <InfoItem label="Attachments" value={`${asset.attachments.length} file(s)`} />
              <InfoItem label="Task ID" value={asset.task_id ? asset.task_id.toString() : 'N/A'} />
              <InfoItem label="Account Plan" value={asset.account_plan} />
            </Section>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm sm:text-base text-muted-foreground">{title}</h4>
      <Separator />
      <div className="space-y-1 sm:space-y-2">{children}</div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between text-sm sm:text-base">
      <span className="text-muted-foreground mb-1 sm:mb-0">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}